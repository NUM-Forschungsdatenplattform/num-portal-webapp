/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { ISofaScoreAverage } from 'src/app/shared/models/charts/sofa-score-average.interface'
import { ISofaScoreDistribution } from 'src/app/shared/models/charts/sofa-score-distribution.interface'
import { IDashboardCard } from 'src/app/shared/models/content/dashboard-card.interface'
import { IDashboardMetrics } from 'src/app/shared/models/content/dashboard-metrics.interface'
import { IDashboardProject } from 'src/app/shared/models/content/dashboard-project.interface'
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

  private projects: IDashboardProject[] = undefined
  private projectsSubject$ = new BehaviorSubject(this.projects)
  public projectsObservable$ = this.projectsSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/content`
  }

  getNavigationLinks(): Observable<INavigationLink[]> {
    return this.httpClient.get<INavigationLink[]>(`${this.baseUrl}/navigation`).pipe(
      tap((links) => {
        this.navigationLinks = links
        this.navigationLinksSubject$.next(links)
      }),
      catchError(this.handleError),
    )
  }

  updateNavigationLinks(navigationLinks: INavigationLink[]): Observable<INavigationLink[]> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<INavigationLink[]>(`${this.baseUrl}/navigation`, navigationLinks, httpOptions)
      .pipe(
        tap((_links) => {
          this.navigationLinks = navigationLinks
          this.navigationLinksSubject$.next(navigationLinks)
        }),
        catchError(this.handleError),
      )
  }

  getCards(): Observable<IDashboardCard[]> {
    return this.httpClient.get<IDashboardCard[]>(`${this.baseUrl}/cards`).pipe(
      tap((cards) => {
        this.cards = cards
        this.cardsSubject$.next(cards)
      }),
      catchError(this.handleError),
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
        catchError(this.handleError),
      )
  }

  getMetrics(): Observable<IDashboardMetrics> {
    return this.httpClient.get<IDashboardMetrics>(`${this.baseUrl}/metrics`).pipe(
      tap((metrics) => {
        this.metrics = metrics
        this.metricsSubject$.next(metrics)
      }),
      catchError(this.handleError),
    )
  }

  getLatestProjects(): Observable<IDashboardProject[]> {
    return this.httpClient.get<IDashboardProject[]>(`${this.baseUrl}/latest-projects`).pipe(
      tap((projects) => {
        this.projects = projects
        this.projectsSubject$.next(projects)
      }),
      catchError(this.handleError),
    )
  }

  getClinics(): Observable<string[]> {
    return this.httpClient
      .get<string[]>(`${this.baseUrl}/graph/clinic`)
      .pipe(catchError(this.handleError))
  }
  getSofaScoreDistribution(clinic: string): Observable<ISofaScoreDistribution> {
    return this.httpClient
      .get<ISofaScoreDistribution>(`${this.baseUrl}/graph/clinic/${clinic}/sofaDistribution`)
      .pipe(catchError(this.handleError))
  }
  getSofaScoreAverage(): Observable<ISofaScoreAverage> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/graph/clinic/sofaAverage`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
