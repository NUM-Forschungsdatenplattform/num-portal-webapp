import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AppConfigService } from '../../config/app-config.service'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { ITemplateMetaDataApi } from '../../shared/models/template/template-api.interface'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { ITemplateFilter } from '../../shared/models/template/template-filter.interface'
import { DEFAULT_TEMPLATE_FILTER } from '../constants/default-filter-template'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300

  private baseUrl: string

  private templates: ITemplateMetaDataApi[] = []
  private templatesSubject$ = new BehaviorSubject(this.templates)
  public templatesObservable$ = this.templatesSubject$.asObservable()

  private filteredTemplates: ITemplateMetaDataApi[] = []
  private filteredTemplatesSubject$ = new BehaviorSubject(this.filteredTemplates)
  public filteredTemplatesObservable$ = this.filteredTemplatesSubject$.asObservable()

  private filterSet: ITemplateFilter = DEFAULT_TEMPLATE_FILTER
  private filterConfigSubject$ = new BehaviorSubject(this.filterSet)
  public filterConfigObservable$ = this.filterConfigSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/template/metadata`

    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredTemplatesSubject$.next(filterResult))
  }

  getAll(): Observable<ITemplateMetaDataApi[]> {
    return this.httpClient.get<ITemplateMetaDataApi[]>(this.baseUrl).pipe(
      tap((templates) => {
        this.templates = templates
        this.templatesSubject$.next(templates)
      }),
      catchError(this.handleError)
    )
  }

  setFilter(filterSet: ITemplateFilter): void {
    this.filterConfigSubject$.next(filterSet)
  }

  private getFilterResult$(filterSet: ITemplateFilter): Observable<ITemplateMetaDataApi[]> {
    if (this.templates.length) {
      return of(this.filterItems(this.templates, filterSet))
    } else {
      return this.getAll().pipe(
        map((templatesArray) => {
          return this.filterItems(templatesArray, filterSet)
        })
      )
    }
  }

  filterItems(
    allTemplates: ITemplateMetaDataApi[],
    filterSet: ITemplateFilter
  ): ITemplateMetaDataApi[] {
    let result: ITemplateMetaDataApi[] = allTemplates

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toUpperCase()
      result = allTemplates.filter((templates) => templates.name.toUpperCase().includes(textFilter))
    }

    return result
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
