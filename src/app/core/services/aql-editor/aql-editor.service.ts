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
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { NumAqlFormattingProvider } from 'src/app/modules/code-editor/num-aql-formatting-provider'
import { IAqlValidationResponse } from 'src/app/shared/models/archetype-query-builder/aql-validation-response.interface'
import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { IContainmentNode } from 'src/app/shared/models/archetype-query-builder/template/containment-node.interface'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'

@Injectable({
  providedIn: 'root',
})
export class AqlEditorService {
  formatter = new NumAqlFormattingProvider()
  private baseUrl: string

  private templates: IEhrbaseTemplate[] = []
  private templatesSubject$ = new BehaviorSubject(this.templates)
  public templatesObservable$ = this.templatesSubject$.asObservable()

  private containmentCache: IDictionary<string, IContainmentNode> = {}

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/aqleditor/v1`
  }

  getTemplates(): Observable<IEhrbaseTemplate[]> {
    return this.httpClient.get<IEhrbaseTemplate[]>(`${this.baseUrl}/template`).pipe(
      tap((templates) => {
        this.templates = templates
        this.templatesSubject$.next(templates)
      }),
      catchError(this.handleError),
    )
  }

  getContainment(id: string): Observable<IContainmentNode> {
    const cachedContainment = this.containmentCache[id]
    if (cachedContainment) {
      return of(cachedContainment)
    }

    return this.httpClient.get<IContainmentNode>(`${this.baseUrl}/containment/${id}`).pipe(
      tap((containment) => {
        this.containmentCache[id] = containment
      }),
      catchError(this.handleError),
    )
  }

  buildAql(aqbModel: IArchetypeQueryBuilder): Observable<IArchetypeQueryBuilderResponse> {
    return this.httpClient
      .post<IArchetypeQueryBuilderResponse>(`${this.baseUrl}/aql`, aqbModel)
      .pipe(
        map((result) => {
          result.q = this.formatter.formatQuery(result.q)
          return result
        }),
        catchError((error) => this.handleError(error)),
      )
  }

  validateAql(query: string): Observable<IAqlValidationResponse> {
    return this.httpClient
      .post<IAqlValidationResponse>(`${this.baseUrl}/aql/validate`, { q: query })
      .pipe(catchError((error) => this.handleError(error)))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
