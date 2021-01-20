import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError, forkJoin } from 'rxjs'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { IRole } from 'src/app/shared/models/user/role.interface'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { environment } from 'src/environments/environment'
import { DEFAULT_USER_FILTER } from '../../constants/default-filter-user'

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300

  private baseUrl: string

  private unapprovedUsers: IUser[] = []
  private unapprovedUsersSubject$ = new BehaviorSubject(this.unapprovedUsers)
  public unapprovedUsersObservable$ = this.unapprovedUsersSubject$.asObservable()

  private approvedUsers: IUser[] = []
  private approvedUsersSubject$ = new BehaviorSubject(this.approvedUsers)
  public approvedUsersObservable$ = this.approvedUsersSubject$.asObservable()

  private filteredApprovedUsers: IUser[] = []
  private filteredApprovedUsersSubject$ = new BehaviorSubject(this.filteredApprovedUsers)
  public filteredApprovedUsersObservable$ = this.filteredApprovedUsersSubject$.asObservable()

  private filterSet: IUserFilter = DEFAULT_USER_FILTER
  private filterConfigSubject$ = new BehaviorSubject(this.filterSet)
  public filterConfigObservable$ = this.filterConfigSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/admin`

    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredApprovedUsersSubject$.next(filterResult))
  }

  private getUsers(approved: boolean, withRoles: boolean = false): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(`${this.baseUrl}/user?approved=${approved}&withRoles=${withRoles}`)
      .pipe(catchError(this.handleError))
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient
      .get<IUser>(`${this.baseUrl}/user/${id}`)
      .pipe(catchError(this.handleError))
  }

  getUsersByIds(ids: string[]): Observable<IUser[]> {
    return forkJoin(ids.map((id) => this.getUserById(id)))
  }

  getUnapprovedUsers(): Observable<IUser[]> {
    return this.getUsers(false).pipe(
      tap((users) => {
        this.unapprovedUsers = users
        this.unapprovedUsersSubject$.next(users)
        if (users.length) {
          this.setFilter(this.filterSet)
        }
      })
    )
  }

  getApprovedUsers(): Observable<IUser[]> {
    return this.getUsers(true, true).pipe(
      tap((users) => {
        this.approvedUsers = users
        this.approvedUsersSubject$.next(users)
        this.setFilter(this.filterSet)
      })
    )
  }

  approveUser(userId: string): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<string>(`${this.baseUrl}/user/${userId}/approve`, undefined, httpOptions)
      .pipe(catchError(this.handleError))
  }

  getUserRoles(userId: string): Observable<IRole[]> {
    return this.httpClient
      .get<IRole[]>(`${this.baseUrl}/user/${userId}/role`)
      .pipe(catchError(this.handleError))
  }

  addUserRoles(userId: string, role: string[]): Observable<string[]> {
    return this.httpClient
      .post<string[]>(`${this.baseUrl}/user/${userId}/role`, role)
      .pipe(catchError(this.handleError))
  }

  addUserOrganization(userId: string, organization: IOrganization): Observable<IOrganization> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<IOrganization>(`${this.baseUrl}/user/${userId}/organization`, organization, httpOptions)
      .pipe(catchError(this.handleError))
  }

  setFilter(filterSet: IUserFilter): void {
    this.filterConfigSubject$.next(filterSet)
    this.filterSet = filterSet
  }

  private getFilterResult$(filterSet: IUserFilter): Observable<IUser[]> {
    if (this.approvedUsers.length) {
      return of(this.filterItems(this.approvedUsers, filterSet))
    } else {
      return this.getApprovedUsers().pipe(
        map((userArray) => {
          return this.filterItems(userArray, filterSet)
        })
      )
    }
  }

  filterItems(allApprovedUsers: IUser[], filterSet: IUserFilter): IUser[] {
    let result: IUser[] = allApprovedUsers

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toUpperCase()
      result = allApprovedUsers.filter(
        (user) =>
          user.lastName.toUpperCase().includes(textFilter) ||
          user.firstName.toUpperCase().includes(textFilter) ||
          user.firstName.concat(' ', user.lastName).toUpperCase().includes(textFilter) ||
          user.lastName.concat(' ', user.firstName).toUpperCase().includes(textFilter)
      )
    }

    return result
  }

  refreshFilterResult(): void {
    this.approvedUsers = []
    this.filterConfigSubject$.next(this.filterSet)
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
