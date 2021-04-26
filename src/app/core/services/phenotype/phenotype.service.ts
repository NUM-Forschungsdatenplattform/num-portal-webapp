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
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IPhenotypeApi } from '../../../shared/models/phenotype/phenotype-api.interface'
import { environment } from '../../../../environments/environment'
import { DEFAULT_PHENOTYPE_FILTER } from '../../constants/default-filter-phenotype'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'
import { PhenotypeFilterChipId } from 'src/app/shared/models/phenotype/phenotype-filter-chip.enum'
import { ProfileService } from '../profile/profile.service'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'

@Injectable({
  providedIn: 'root',
})
export class PhenotypeService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300
  user: IUserProfile

  private baseUrl: string

  private phenotypes: IPhenotypeApi[] = []
  private phenotypesSubject$ = new BehaviorSubject(this.phenotypes)
  public phenotypesObservable$ = this.phenotypesSubject$.asObservable()

  private filteredPhenotypes: IPhenotypeApi[] = []
  private filteredPhenotypesSubject$ = new BehaviorSubject(this.filteredPhenotypes)
  public filteredPhenotypesObservable$ = this.filteredPhenotypesSubject$.asObservable()

  private filterSet: IPhenotypeFilter = DEFAULT_PHENOTYPE_FILTER
  private filterConfigSubject$ = new BehaviorSubject(this.filterSet)
  public filterConfigObservable$ = this.filterConfigSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
    private profileService: ProfileService
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/phenotype`

    this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))

    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredPhenotypesSubject$.next(filterResult))
  }

  getAll(): Observable<IPhenotypeApi[]> {
    return this.httpClient.get<IPhenotypeApi[]>(this.baseUrl).pipe(
      tap((phenotypes) => {
        this.phenotypes = phenotypes
        this.phenotypesSubject$.next(phenotypes)
        if (this.phenotypes.length) {
          this.setFilter(this.filterSet)
        }
      }),
      catchError(this.handleError)
    )
  }

  get(id: number): Observable<IPhenotypeApi> {
    return this.httpClient
      .get<IPhenotypeApi>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  setFilter(filterSet: IPhenotypeFilter): void {
    this.filterConfigSubject$.next(filterSet)
  }

  private getFilterResult$(filterSet: IPhenotypeFilter): Observable<IPhenotypeApi[]> {
    if (this.phenotypes.length) {
      return of(this.filterItems(this.phenotypes, filterSet))
    } else {
      return this.getAll().pipe(
        map((phenotypeArray) => {
          return this.filterItems(phenotypeArray, filterSet)
        }),
        catchError(() => {
          return of([])
        })
      )
    }
  }

  filterItems(allPhenotypes: IPhenotypeApi[], filterSet: IPhenotypeFilter): IPhenotypeApi[] {
    let result: IPhenotypeApi[] = allPhenotypes

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toLowerCase().trim()

      result = allPhenotypes.filter(
        (phenotype) =>
          phenotype.name?.toLowerCase().includes(textFilter) ||
          phenotype.owner?.lastName?.toLowerCase().includes(textFilter) ||
          phenotype.owner?.firstName?.toLowerCase().includes(textFilter) ||
          phenotype.owner?.firstName
            ?.concat(' ', phenotype.owner?.lastName)
            .toLowerCase()
            .includes(textFilter) ||
          phenotype.owner?.lastName
            ?.concat(' ', phenotype.owner?.firstName)
            .toLowerCase()
            .includes(textFilter)
      )
    }

    filterSet.filterItem.forEach((filterItem) => {
      if (filterItem.isSelected) {
        if (filterItem.id === PhenotypeFilterChipId.MyPhenotype) {
          result = result.filter((phenotype) => phenotype.owner?.id === this.user.id)
        } else if (filterItem.id === PhenotypeFilterChipId.OrganizationPhenotype) {
          result = result.filter(
            (phenotype) => phenotype.owner?.organization?.id === this.user.organization?.id
          )
        }
      }
    })

    return result
  }

  create(phenotype: IPhenotypeApi): Observable<IPhenotypeApi> {
    return this.httpClient
      .post<IPhenotypeApi>(this.baseUrl, phenotype)
      .pipe(catchError(this.handleError))
  }

  getSize(phenotype: IPhenotypeApi): Observable<number> {
    return this.httpClient
      .post<number>(`${this.baseUrl}/size`, phenotype)
      .pipe(catchError(this.handleError))
  }

  delete(phenotypeId: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.baseUrl}/${phenotypeId}`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
