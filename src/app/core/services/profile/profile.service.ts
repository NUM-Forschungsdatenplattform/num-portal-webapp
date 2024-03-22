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

import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AppConfigService } from '../../../config/app-config.service'
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { IUserProfile } from '../../../shared/models/user/user-profile.interface'

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userProfile = {} as IUserProfile
  private userProfileSubject$ = new BehaviorSubject(this.userProfile)
  private userApprovedSubject = new Subject<any>()
  public userProfileObservable$ = this.userProfileSubject$.asObservable()
  public userNotApproved = false
  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService
  ) {}

  get apiBase(): string {
    return this.appConfig.config.api.baseUrl
  }
  get baseUrl(): string {
    return `${this.apiBase}/profile`
  }

  get(): Observable<IUserProfile> {
    return this.httpClient.get<IUserProfile>(this.baseUrl).pipe(
      tap((userProfile) => {
        this.userProfile = userProfile
        this.userProfileSubject$.next(userProfile)
      }),
      catchError(this.handleError)
    )
  }

  changeUserName(firstName: string, lastName: string): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    const userId = this.userProfile.id
    if (!userId) {
      throw new Error('User id not found in profile')
    }
    return this.httpClient
      .post<string>(
        `${this.apiBase}/admin/user/${userId}/name`,
        { firstName, lastName },
        httpOptions
      )
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }

  setUnapproveUser(unapproved: boolean): void {
    this.userApprovedSubject.next(unapproved)
    this.userNotApproved = unapproved
  }

  getUnapprovedUser(): Observable<any> {
    return this.userApprovedSubject.asObservable()
  }
}
