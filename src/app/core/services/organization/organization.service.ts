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
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private baseUrl: string

  private organizations: any = {}
  private organizationsSubject$ = new BehaviorSubject(this.organizations)
  public organizationsObservable$ = this.organizationsSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/organization`
  }

  getAllPag(
    page: number,
    size: number,
    active?: string,
    sort: string = null,
    sortBy: string = null
  ): Observable<any> {
    let queryString = ''
    if (page !== null && size !== null) {
      queryString = queryString + '?page=' + page + '&size=' + size
    }

    if (sort) {
      queryString = queryString + '&sort=' + sort + '&sortBy=' + sortBy
    }
    if (active) {
      queryString = queryString + '&filter%5Bactive%5D=' + active
    }
    return this.httpClient.get<any>(this.baseUrl + '/all' + queryString).pipe(
      tap((data) => {
        this.organizations = data.content
        this.organizationsSubject$.next(data)
      }),
      catchError(this.handleError)
    )
  }

  getAll(): Observable<IOrganization[]> {
    return this.httpClient.get<IOrganization[]>(this.baseUrl).pipe(
      tap((organizations) => {
        this.organizations = organizations
        this.organizationsSubject$.next(organizations)
      }),
      catchError(this.handleError)
    )
  }

  get(id: number): Observable<IOrganization> {
    return this.httpClient
      .get<IOrganization>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  create(organization: IOrganization): Observable<IOrganization> {
    return this.httpClient
      .post<IOrganization>(`${this.baseUrl}`, organization)
      .pipe(catchError(this.handleError))
  }

  update(id: number, organization: IOrganization): Observable<IOrganization> {
    return this.httpClient
      .put<IOrganization>(`${this.baseUrl}/${id}`, organization)
      .pipe(catchError(this.handleError))
  }

  delete(id: number): Observable<IOrganization> {
    return this.httpClient
      .delete<IOrganization>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
