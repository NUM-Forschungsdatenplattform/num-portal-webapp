import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Ptor } from 'protractor'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, filter, map, tap, throwIfEmpty } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IPhenotype } from '../models/phenotype.interface'

@Injectable({
  providedIn: 'root',
})
export class PhenotypeService {
  private baseUrl: string

  private phenotypes: IPhenotype[] = []
  private phenotypesSubject$ = new BehaviorSubject(this.phenotypes)
  public phenotypesObservable$ = this.phenotypesSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/phenotype`
  }

  getAll(): Observable<IPhenotype[]> {
    return this.httpClient.get<IPhenotype[]>(this.baseUrl).pipe(
      tap((phenotypes) => {
        this.phenotypes = phenotypes
        this.phenotypesSubject$.next(phenotypes)
      }),
      catchError(this.handleError)
    )
  }

  get(id: number): Observable<IPhenotype> {
    let result: IPhenotype
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

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
