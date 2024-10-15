import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map, shareReplay } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IFeature } from '../../../shared/models/feature/feature.interface'
import { AvailableFeatures } from '../../../shared/models/feature/available-features.enum'

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private baseUrl: string

  private features: Observable<AvailableFeatures[]>

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${this.appConfigService.config.api.baseUrl}`
    this.createObservable()
  }

  getFeature(): Observable<AvailableFeatures[]> {
    return this.features
  }

  createObservable(): void {
    this.features = this.httpClient.get<IFeature>(`${this.baseUrl}/feature`).pipe(
      catchError(this.handleError),
      map((res) => {
        return Object.values(AvailableFeatures)
          .filter((k) => isNaN(Number(k)))
          .map((value, index) =>
            res[value[0].toLowerCase() + value.toString().substring(1)] ? index : null
          )
          .filter((value) => value != null)
      }),
      shareReplay(1)
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error)
  }
}
