import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { IContainmentNode } from 'src/app/shared/models/archetype-query-builder/template/containment-node.interface'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'

@Injectable({
  providedIn: 'root',
})
export class AqlEditorService {
  private baseUrl: string

  private templates: IEhrbaseTemplate[] = []
  private templatesSubject$ = new BehaviorSubject(this.templates)
  public templatesObservable$ = this.templatesSubject$.asObservable()

  private containmentCache: IDictionary<IContainmentNode> = {}

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.aqlEditor.baseUrl}/aqleditor/rest/v1`
  }

  getTemplates(): Observable<IEhrbaseTemplate[]> {
    return this.httpClient.get<IEhrbaseTemplate[]>(`${this.baseUrl}/template`).pipe(
      tap((templates) => {
        this.templates = templates
        this.templatesSubject$.next(templates)
      }),
      catchError(this.handleError)
    )
  }

  getContainment(id: string): Observable<IContainmentNode> {
    const cachedContainment = this.containmentCache[id]
    if (!!cachedContainment) {
      return of(cachedContainment)
    }

    return this.httpClient.get<IContainmentNode>(`${this.baseUrl}/containment/${id}`).pipe(
      tap((containment) => {
        this.containmentCache[id] = containment
      }),
      catchError(this.handleError)
    )
  }

  buildAql(aqbModel: IArchetypeQueryBuilder): Observable<IArchetypeQueryBuilderResponse> {
    return this.httpClient.post<IArchetypeQueryBuilderResponse>(`${this.baseUrl}/aql`, aqbModel)
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
