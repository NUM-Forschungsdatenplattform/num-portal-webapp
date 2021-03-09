import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { INavigationLink } from 'src/app/shared/models/content/navigation-link.interface'

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private baseUrl: string

  private navigationLinks: INavigationLink[] = []
  private navigationLinksSubject$ = new BehaviorSubject(this.navigationLinks)
  public navigationLinksObservable$ = this.navigationLinksSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/content`
  }

  getNavigationLinks(): Observable<INavigationLink[]> {
    return this.httpClient.get<INavigationLink[]>(`${this.baseUrl}/navigation`).pipe(
      tap((links) => {
        this.navigationLinks = links
        this.navigationLinksSubject$.next(links)
      }),
      catchError(this.handleError)
    )
  }

  updateNavigationLinks(navigationLinks: INavigationLink[]): Observable<INavigationLink[]> {
    return this.httpClient
      .post<INavigationLink[]>(`${this.baseUrl}/navigation`, navigationLinks)
      .pipe(
        tap((links) => {
          this.navigationLinks = links
          this.navigationLinksSubject$.next(links)
        }),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
