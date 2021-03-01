import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private baseUrl: string

  private organizations: IOrganization[] = []
  private organizationsSubject$ = new BehaviorSubject(this.organizations)
  public organizationsObservable$ = this.organizationsSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/organization`
  }

  getAll(): Observable<IOrganization[]> {
    return this.httpClient.get<IOrganization[]>(this.baseUrl).pipe(
      tap((organizations) => {
        this.organizations = organizations
        this.organizationsSubject$.next(organizations)
      }),
      catchError(this.handleError)
    )
  }

  get(id: number): Observable<IOrganization> {
    return this.httpClient
      .get<IOrganization>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  create(organization: IOrganization): Observable<IOrganization> {
    return this.httpClient
      .post<IOrganization>(`${this.baseUrl}`, organization)
      .pipe(catchError(this.handleError))
  }

  update(id: number, organization: IOrganization): Observable<IOrganization> {
    return this.httpClient
      .put<IOrganization>(`${this.baseUrl}/${id}`, organization)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
