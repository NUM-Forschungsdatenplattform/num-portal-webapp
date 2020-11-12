import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { DEFAULT_AQL_FILTER } from '../constants/default-filter-aql'
import { IAqlFilter } from '../../shared/models/aql/aql-filter.interface'
import { IAql } from '../../shared/models/aql/aql.interface'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AqlService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300
  private baseUrl: string

  private aqls: IAql[] = []
  private aqlsSubject$ = new BehaviorSubject(this.aqls)
  public aqlsObservable$ = this.aqlsSubject$.asObservable()

  private filteredAqls: IAql[] = []
  private filteredAqlsSubject$ = new BehaviorSubject(this.filteredAqls)
  public filteredAqlsObservable$ = this.filteredAqlsSubject$.asObservable()

  private filterSet: IAqlFilter = DEFAULT_AQL_FILTER
  private filterConfigSubject$ = new BehaviorSubject(this.filterSet)
  public filterConfigObservable$ = this.filterConfigSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/aql`
    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredAqlsSubject$.next(filterResult))
  }

  getAll(): Observable<IAql[]> {
    return this.httpClient.get<IAql[]>(this.baseUrl).pipe(
      tap((aqls) => {
        this.aqls = aqls
        this.aqlsSubject$.next(aqls)
      }),
      catchError(this.handleError)
    )
  }

  setFilter(filterSet: IAqlFilter): void {
    this.filterConfigSubject$.next(filterSet)
  }

  private getFilterResult$(filterSet: IAqlFilter): Observable<IAql[]> {
    if (this.aqls.length) {
      return of(this.filterItems(this.aqls, filterSet))
    } else {
      return this.getAll().pipe(
        map((aqlArray) => {
          return this.filterItems(aqlArray, filterSet)
        })
      )
    }
  }

  filterItems(allAqls: IAql[], filterSet: IAqlFilter): IAql[] {
    let result: IAql[] = allAqls

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toUpperCase()
      result = allAqls.filter((aql) => aql.name.toUpperCase().includes(textFilter))
    }

    return result
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
