import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Ptor } from 'protractor'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, filter, map, tap, throwIfEmpty } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { mockPhenotypes } from 'src/mocks/data-mocks/phenotypes.mock'
import { IPhenotypeApi } from '../../shared/models/phenotype/phenotype-api.interface'

@Injectable({
  providedIn: 'root',
})
export class PhenotypeService {
  private baseUrl: string

  private phenotypes: IPhenotypeApi[] = []
  private phenotypesSubject$ = new BehaviorSubject(this.phenotypes)
  public phenotypesObservable$ = this.phenotypesSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/phenotype`
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

  create(phenotype: IPhenotypeApi): Observable<any> {
    return this.httpClient.post<IPhenotypeApi>(this.baseUrl, phenotype).pipe(
      tap((result) => {
        this.phenotypes.push(result)
        this.phenotypesSubject$.next(this.phenotypes)
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
