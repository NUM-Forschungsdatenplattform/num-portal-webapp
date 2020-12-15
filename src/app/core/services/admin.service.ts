import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { DEFAULT_USER_FILTER } from '../constants/default-filter-user'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string

  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300

  private approvedUsers: IUser[] = []
  private approvedUsersSubject$ = new BehaviorSubject(this.approvedUsers)
  public approvedUsersObservable$ = this.approvedUsersSubject$.asObservable()

  private unapprovedUsers: IUser[] = []
  private unapprovedUsersSubject$ = new BehaviorSubject(this.unapprovedUsers)
  public unapprovedUsersObservable$ = this.unapprovedUsersSubject$.asObservable()

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

  private getUsers(approved: boolean): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(`${this.baseUrl}/user?approved=${approved}`)
      .pipe(catchError(this.handleError))
  }

  getApprovedUsers(): Observable<IUser[]> {
    // TODO Mina: change to true
    return this.getUsers(false).pipe(
      tap((users) => {
        this.approvedUsers = users
        this.approvedUsersSubject$.next(users)
      })
    )
  }

  getUnapprovedUsers(): Observable<IUser[]> {
    return this.getUsers(false).pipe(
      tap((users) => {
        this.unapprovedUsers = users
        this.unapprovedUsersSubject$.next(users)
      })
    )
  }

  setFilter(filterSet: IUserFilter): void {
    this.filterConfigSubject$.next(filterSet)
  }

  private getFilterResult$(filterSet: IUserFilter): Observable<IUser[]> {
    if (this.approvedUsers.length) {
      return of(this.filterItems(this.approvedUsers, filterSet))
    } else {
      return this.getApprovedUsers().pipe(
        map((approvedUsersArray) => {
          return this.filterItems(approvedUsersArray, filterSet)
        })
      )
    }
  }

  filterItems(approvedUsers: IUser[], filterSet: IUserFilter): IUser[] {
    let result: IUser[] = this.approvedUsers

    if (filterSet.searchText && filterSet.searchText.length) {
      const searchText = filterSet.searchText.toLowerCase()
      result = approvedUsers.filter((user: IUser) => {
        const firstName = user.firstName.toLowerCase()
        const lastName = user.lastName.toLowerCase()

        return (
          firstName.includes(searchText) ||
          lastName.includes(searchText) ||
          searchText.includes(firstName) ||
          searchText.includes(lastName)
        )
      })
    }

    return result
  }

  addUserRoles(userId: string, role: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'text/plain',
      }),
      responseType: 'text' as 'json',
    }

    return this.httpClient
      .post<string>(`${this.baseUrl}/user/${userId}/role`, `"${role}"`, httpOptions)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
