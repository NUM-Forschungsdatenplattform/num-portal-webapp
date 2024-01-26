import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private baseUrl: string

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}`
  }

  resolvePseudonym(projectId: number, pseudonym: string): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .get<string>(`${this.baseUrl}/project/${projectId}/resolve/${pseudonym}`, httpOptions)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
