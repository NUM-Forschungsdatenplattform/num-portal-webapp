/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError, forkJoin } from 'rxjs'
import { catchError, map, skip, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { IRole } from 'src/app/shared/models/user/role.interface'
import { UserFilterChipId } from 'src/app/shared/models/user/user-filter-chip.enum'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { environment } from 'src/environments/environment'
import { DEFAULT_USER_FILTER } from '../../constants/default-filter-user'
import { ProfileService } from '../profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300

  private baseUrl: string
  user: IUserProfile

  private users: any = {}
  private usersSubject$ = new BehaviorSubject(this.users)
  public usersObservable$ = this.usersSubject$.asObservable()

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

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
    private profileService: ProfileService
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/admin`

    this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))

    this.filterConfigObservable$
      .pipe(
        skip(1),
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredApprovedUsersSubject$.next(filterResult))
  }

  private getUsers(approved: boolean, withRoles = false): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(`${this.baseUrl}/user?approved=${approved}&withRoles=${withRoles}`)
      .pipe(catchError(this.handleError))
  }

  getAllPag(
    page: number,
    size: number,
    sort: string = null,
    sortBy: string = null,
    filters: any
  ): Observable<any> {
    let queryString = ''
    if (page !== null && size !== null) {
      queryString = queryString + '?page=' + page + '&size=' + size

      if (sort) {
        queryString = queryString + '&sort=' + sort + '&sortBy=' + sortBy
      }

      for (const [key, value] of Object.entries(filters)) {
        if (value !== null) {
          queryString = queryString + '&filter%5B' + key + '%5D=' + value
        }
      }
    }
    return this.httpClient.get<any>(this.baseUrl + '/user/all' + queryString).pipe(
      tap((data) => {
        this.users = data.content
        this.usersSubject$.next(data)
      }),
      catchError(this.handleError)
    )
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

  changeUserName(userId: string, firstName: string, lastName: string): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<string>(`${this.baseUrl}/user/${userId}/name`, { firstName, lastName }, httpOptions)
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
        }),
        catchError(() => {
          return of([])
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
          user.lastName?.toUpperCase().includes(textFilter) ||
          user.firstName?.toUpperCase().includes(textFilter) ||
          user.firstName?.concat(' ', user.lastName).toUpperCase().includes(textFilter) ||
          user.lastName?.concat(' ', user.firstName).toUpperCase().includes(textFilter) ||
          user.email.toUpperCase().includes(textFilter)
      )
    }

    filterSet.filterItem.forEach((filterItem) => {
      if (filterItem.isSelected) {
        if (filterItem.id === UserFilterChipId.OrganizationUser) {
          result = result.filter((user) => user.organization?.id === this.user.organization?.id)
        }
      }
    })

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
