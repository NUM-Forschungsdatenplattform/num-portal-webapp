import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError, forkJoin } from 'rxjs'
import { catchError, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
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
  }

  private getUsers(
    approved: boolean,
    withRoles: boolean = false,
    search: string = ''
  ): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(
        `${this.baseUrl}/user?approved=${approved}&withRoles=${withRoles}&search=${search}`
      )
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
    return this.getUsers(false, true).pipe(
      tap((users) => {
        this.unapprovedUsers = users
        this.unapprovedUsersSubject$.next(users)
      })
    )
  }

  getApprovedUsers(): Observable<IUser[]> {
    return this.getUsers(true, true).pipe(
      tap((users) => {
        this.approvedUsers = users
        this.approvedUsersSubject$.next(users)
        if (this.approvedUsers.length) {
          this.setFilter(this.filterSet)
        }
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

  addUserOrganization(userId: string, organization: IOrganization): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<string>(`${this.baseUrl}/user/${userId}/organization`, organization, httpOptions)
      .pipe(catchError(this.handleError))
  }

  subscribeFilterConfig(): void {
    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredApprovedUsersSubject$.next(filterResult))
  }

  setFilter(filterSet: IUserFilter): void {
    this.filterConfigSubject$.next(filterSet)
    this.filterSet = filterSet
  }

  private getFilterResult$(filterSet: IUserFilter): Observable<IUser[]> {
    return this.getUsers(true, true, filterSet.searchText)
  }

  refreshFilterResult(): void {
    this.filterConfigSubject$.next(this.filterSet)
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
