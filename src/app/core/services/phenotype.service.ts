import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
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

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
