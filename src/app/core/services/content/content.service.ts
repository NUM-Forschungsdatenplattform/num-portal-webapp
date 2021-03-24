import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IDashboardCard } from 'src/app/shared/models/content/dashboard-card.interface'
import { IDashboardMetrics } from 'src/app/shared/models/content/dashboard-metrics.interface'
import { INavigationLink } from 'src/app/shared/models/content/navigation-link.interface'

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private baseUrl: string

  private navigationLinks: INavigationLink[] = []
  private navigationLinksSubject$ = new BehaviorSubject(this.navigationLinks)
  public navigationLinksObservable$ = this.navigationLinksSubject$.asObservable()

  private cards: IDashboardCard[] = []
  private cardsSubject$ = new BehaviorSubject(this.cards)
  public cardsObservable$ = this.cardsSubject$.asObservable()

  private metrics: IDashboardMetrics = undefined
  private metricsSubject$ = new BehaviorSubject(this.metrics)
  public metricsObservable$ = this.metricsSubject$.asObservable()

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
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<INavigationLink[]>(`${this.baseUrl}/navigation`, navigationLinks, httpOptions)
      .pipe(
        tap((links) => {
          this.navigationLinks = links
          this.navigationLinksSubject$.next(links)
        }),
        catchError(this.handleError)
      )
  }

  getCards(): Observable<IDashboardCard[]> {
    return this.httpClient.get<IDashboardCard[]>(`${this.baseUrl}/cards`).pipe(
      tap((cards) => {
        this.cards = cards
        this.cardsSubject$.next(cards)
      }),
      catchError(this.handleError)
    )
  }

  updateCards(dashboardCards: IDashboardCard[]): Observable<IDashboardCard[]> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<IDashboardCard[]>(`${this.baseUrl}/cards`, dashboardCards, httpOptions)
      .pipe(
        tap((cards) => {
          this.cards = cards
          this.cardsSubject$.next(cards)
        }),
        catchError(this.handleError)
      )
  }

  getMetrics(): Observable<IDashboardMetrics> {
    return this.httpClient.get<IDashboardMetrics>(`${this.baseUrl}/metrics`).pipe(
      tap((metrics) => {
        this.metrics = metrics
        this.metricsSubject$.next(metrics)
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
