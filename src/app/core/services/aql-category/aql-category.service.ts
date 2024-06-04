import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAqlCategoryApi } from 'src/app/shared/models/aql/category/aql-category.interface'

@Injectable({
  providedIn: 'root',
})
export class AqlCategoryService {
  private baseUrl: string

  private aqlCategories: any = {}
  private aqlCategoriesSubject$ = new BehaviorSubject(this.aqlCategories)
  aqlCategoriesObservable$ = this.aqlCategoriesSubject$.asObservable()

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${this.appConfigService.config.api.baseUrl}/aql/category`
  }

  getAllPag(
    page: number,
    size: number,
    sort: string = null,
    sortBy: string = null
  ): Observable<any> {
    let qString = ''
    if (page !== null && size !== null) {
      qString = qString + '?page=' + page + '&size=' + size

      if (sort) {
        qString = qString + '&sort=' + sort + '&sortBy=' + sortBy
      }
    }
    return this.httpClient.get<any>(this.baseUrl + '/all' + qString).pipe(
      tap((data) => {
        this.aqlCategories = data.content
        this.aqlCategoriesSubject$.next(data)
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Get the list of persisted AQL categories from backend and propagate them to the components
   * via services' data subject.
   */
  getAll(): Observable<IAqlCategoryApi[]> {
    return this.httpClient.get<IAqlCategoryApi[]>(this.baseUrl).pipe(
      tap((aqlCategories) => {
        this.aqlCategories = aqlCategories
        this.aqlCategoriesSubject$.next(aqlCategories)
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Get one single AQL category either from previously fetched AQL categories cached in this
   * service or from backend by fetching them all again and search for the target one in the list.
   * The new fetching will also update the list of cached AQL categories in this service.
   *
   * @param id - ID of AQL category to get
   */
  get(id: number): Observable<IAqlCategoryApi> {
    let result: IAqlCategoryApi
    if (this.aqlCategories.length) {
      result = this.aqlCategories.find((aqlCategory) => id === aqlCategory.id)
    }

    if (!result) {
      return this.getAll().pipe(
        map((aqlCategories) => {
          const searchResult = aqlCategories.find((aqlCategory) => id === aqlCategory.id)
          if (searchResult) {
            return searchResult
          }
          throw new Error(`AQL category with id ${id} not found`)
        })
      )
    }

    return of(result)
  }

  /**
   * Save a new category to backend and update list with the new inserted item
   *
   * @param newCategory - New category data to be saved
   */
  save(newCategory: Omit<IAqlCategoryApi, 'id'>): Observable<IAqlCategoryApi> {
    return this.httpClient.post<IAqlCategoryApi>(this.baseUrl, newCategory).pipe(
      tap((created) => {
        this.aqlCategories.push(created)
        this.aqlCategoriesSubject$.next(this.aqlCategories)
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Saves new data to an existing AQL category and updates the list of cached aql categories
   * with the new saved values.
   *
   * @param update - New data to update AQL category with
   * @param id - Id of the AQL category to update
   */
  update(update: Omit<IAqlCategoryApi, 'id'>, id: number): Observable<IAqlCategoryApi> {
    return this.httpClient.put<IAqlCategoryApi>(`${this.baseUrl}/${id}`, update).pipe(
      tap(() => {
        this.aqlCategoriesSubject$.next(this.aqlCategories)
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Deletes an AQL category from backend and also updates the list of AQL categories and removed
   * the deleted category from this cache.
   *
   * @param id - ID of AQL category to delete
   */
  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.aqlCategoriesSubject$.next(this.aqlCategories)
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
