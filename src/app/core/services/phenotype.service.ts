import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IPhenotypeApi } from '../../shared/models/phenotype/phenotype-api.interface'
import { environment } from '../../../environments/environment'
import { DEFAULT_PHENOTYPE_FILTER } from '../constants/default-filter-phenotype'
import { IPhenotypeFilter } from 'src/app/shared/models/phenotype/phenotype-filter.interface'

@Injectable({
  providedIn: 'root',
})
export class PhenotypeService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300

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

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/phenotype`

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
      }),
      catchError(this.handleError)
    )
  }

  get(id: number): Observable<IPhenotypeApi> {
    let result: IPhenotypeApi
    if (this.phenotypes.length) {
      result = this.phenotypes.find((phenotype) => phenotype.id === id)
    }

    if (!result) {
      return this.getAll().pipe(
        map((phenotypesArray) => {
          const searchResult = phenotypesArray.find((phenotype) => phenotype.id === id)
          if (searchResult) {
            return searchResult
          }
          throw new Error('Not Found')
        })
      )
    }

    return of(result)
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
        })
      )
    }
  }

  filterItems(allPhenotypes: IPhenotypeApi[], filterSet: IPhenotypeFilter): IPhenotypeApi[] {
    let result: IPhenotypeApi[] = allPhenotypes

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toUpperCase()
      result = allPhenotypes.filter((phenotype) =>
        phenotype.name.toUpperCase().includes(textFilter)
      )
    }

    return result
  }

  create(phenotype: IPhenotypeApi): Observable<any> {
    return this.httpClient
      .post<IPhenotypeApi>(this.baseUrl, phenotype)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
