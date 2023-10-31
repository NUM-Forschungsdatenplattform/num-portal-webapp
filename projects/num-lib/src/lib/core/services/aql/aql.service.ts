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
import { Inject, Injectable, InjectionToken } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, shareReplay, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService, ENVIROMENT_TOKEN } from '../../../config/app-config.service'
import { DEFAULT_AQL_FILTER } from '../../constants/default-filter-aql'
import { IAqlFilter } from '../../../shared/models/aql/aql-filter.interface'
import { IAqlApi } from '../../../shared/models/aql/aql.interface'
import { AqlFilterChipId } from '../../../shared/models/aql/aql-filter-chip.enum'
import { ProfileService } from '../profile/profile.service'
import { TranslateService } from '@ngx-translate/core'
import { IUserProfile } from '../../../shared/models/user/user-profile.interface'


@Injectable({
  providedIn: 'root',
})
export class AqlService {
  /* istanbul ignore next */
  private readonly throttleTime = this.environmentToken.name === 'test' ? 50 : 300
  private baseUrl: string
  getAllObservable$: Observable<IAqlApi[]>
  cacheTime = 3000
  getAllTimeStamp = new Date()
  user: IUserProfile
  currentLang = this.translateService.currentLang || 'en'

  private aqls: IAqlApi[] = []
  private aqlsSubject$ = new BehaviorSubject(this.aqls)
  public aqlsObservable$ = this.aqlsSubject$.asObservable()

  private filteredAqls: any = {}
  private filteredAqlsSubject$ = new BehaviorSubject(this.filteredAqls)
  public filteredAqlsObservable$ = this.filteredAqlsSubject$.asObservable()

  private filterSet: IAqlFilter = DEFAULT_AQL_FILTER
  private filterConfigSubject$ = new BehaviorSubject(this.filterSet)
  public filterConfigObservable$ = this.filterConfigSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
    private profileService: ProfileService,
    private translateService: TranslateService,
    @Inject(ENVIROMENT_TOKEN) readonly environmentToken: any
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/aql`

    // Set initial cache timestamp to past to ensure the first call of getting AQLs will be always
    // done
    this.getAllTimeStamp.setMilliseconds(this.getAllTimeStamp.getMilliseconds() - this.cacheTime)

    this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))

    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredAqlsSubject$.next(filterResult))

    this.translateService.onLangChange.subscribe((event) => {
      this.currentLang = event.lang || 'en'
      this.setFilter(this.filterSet)
    })
  }

  getAllPag(
    page: number,
    size: number,
    sort: string = null,
    sortBy: string = null,
    filters: any,
    lang: string
  ): Observable<any> {
    let queryS = ''
    if (page !== null && size !== null) {
      queryS = queryS + '?page=' + page + '&size=' + size

      if (sort) {
        queryS = queryS + '&sort=' + sort + '&sortBy=' + sortBy
      }

      for (const [key, value] of Object.entries(filters)) {
        if (value !== null) {
          queryS = queryS + '&filter%5B' + key + '%5D=' + value
        }
      }

      if (lang) {
        queryS = queryS + '&language=' + lang
      }
    }
    return this.httpClient.get<any>(this.baseUrl + '/all' + queryS).pipe(
      tap((data) => {
        this.filteredAqls = data.content
        this.filteredAqlsSubject$.next(data)
      }),
      catchError(this.handleError)
    )
  }

  getAll(): Observable<IAqlApi[]> {
    if (!this.getAllObservable$ || this.getAllTimeStamp.valueOf() <= Date.now()) {
      this.getAllObservable$ = this.httpClient.get<IAqlApi[]>(this.baseUrl).pipe(
        tap((aqls) => {
          this.aqls = aqls
          this.aqlsSubject$.next(aqls)

          if (this.aqls.length) {
            this.setFilter(this.filterSet)
          }
        }),
        catchError(this.handleError),
        shareReplay(1)
      )
      this.setNewCacheTimestamp()
    }
    return this.getAllObservable$
  }

  get(id: number): Observable<IAqlApi> {
    let result: IAqlApi
    if (this.aqls.length) {
      result = this.aqls.find((aql) => aql.id === id)
    }

    if (!result) {
      return this.getAll().pipe(
        map((aqlsArray) => {
          const searchResult = aqlsArray.find((aql) => aql.id === id)
          if (searchResult) {
            return searchResult
          }
          throw new Error('Not Found')
        })
      )
    }

    return of(result)
  }

  setFilter(filterSet: IAqlFilter): void {
    this.filterConfigSubject$.next(filterSet)
  }

  private getFilterResult$(filterSet: IAqlFilter): Observable<IAqlApi[]> {
    if (this.aqls.length) {
      return of(this.filterItems(this.aqls, filterSet))
    } else {
      return this.getAll().pipe(
        map((aqlArray) => {
          return this.filterItems(aqlArray, filterSet)
        }),
        catchError(() => {
          return of([])
        })
      )
    }
  }

  filterItems(allAqls: IAqlApi[], filterSet: IAqlFilter): IAqlApi[] {
    let result: IAqlApi[] = allAqls

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toLowerCase().trim()
      const nameField = this.currentLang === 'de' ? 'name' : 'nameTranslated'

      result = allAqls.filter(
        (aql) =>
          aql[nameField]?.toLowerCase().includes(textFilter) ||
          aql.owner?.lastName?.toLowerCase().includes(textFilter) ||
          aql.owner?.firstName?.toLowerCase().includes(textFilter) ||
          aql.owner?.firstName
            ?.concat(' ', aql.owner?.lastName)
            .toLowerCase()
            .includes(textFilter) ||
          aql.owner?.lastName?.concat(' ', aql.owner?.firstName).toLowerCase().includes(textFilter)
      )
    }

    filterSet.filterItem.forEach((filterItem) => {
      if (filterItem.isSelected) {
        if (filterItem.id === AqlFilterChipId.MyAql) {
          result = result.filter((aql) => aql.owner?.id === this.user.id)
        } else if (filterItem.id === AqlFilterChipId.OrganizationAql) {
          result = result.filter(
            (aql) => aql.owner?.organization?.id === this.user.organization?.id
          )
        }
      }
    })

    return result
  }

  save(aqlQuery: IAqlApi): Observable<IAqlApi> {
    return this.httpClient.post<IAqlApi>(this.baseUrl, aqlQuery).pipe(catchError(this.handleError))
  }

  update(aqlQuery: IAqlApi, id: number): Observable<IAqlApi> {
    return this.httpClient
      .put<IAqlApi>(`${this.baseUrl}/${id}`, aqlQuery)
      .pipe(catchError(this.handleError))
  }

  getSize(query: string): Observable<number> {
    return this.httpClient
      .post<number>(`${this.baseUrl}/size`, { query })
      .pipe(catchError(this.handleError))
  }

  delete(aqlId: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.baseUrl}/${aqlId}`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }

  private setNewCacheTimestamp(): void {
    const newTimeStamp = new Date()
    newTimeStamp.setMilliseconds(newTimeStamp.getMilliseconds() + this.cacheTime)
    this.getAllTimeStamp = newTimeStamp
  }
}
