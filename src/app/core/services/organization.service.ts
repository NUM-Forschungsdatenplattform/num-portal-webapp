import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, map, switchMap, tap, throttleTime } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IOrganizationFilter } from 'src/app/shared/models/user/organization-filter.interface'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 300

  private baseUrl: string

  private organizations: IOrganization[] = []
  private organizationsSubject$ = new BehaviorSubject(this.organizations)
  public organizationsObservable$ = this.organizationsSubject$.asObservable()

  private filteredOrganizations: IOrganization[] = []
  private filteredOrganizationsSubject$ = new BehaviorSubject(this.filteredOrganizations)
  public filteredOrganizationsObservable$ = this.filteredOrganizationsSubject$.asObservable()

  private filterSet: IOrganizationFilter = { searchText: '' }
  private filterConfigSubject$ = new BehaviorSubject(this.filterSet)
  public filterConfigObservable$ = this.filterConfigSubject$.asObservable()

  constructor(private httpClient: HttpClient, appConfig: AppConfigService) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/organization`

    this.filterConfigObservable$
      .pipe(
        throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
        switchMap((item) => this.getFilterResult$(item))
      )
      .subscribe((filterResult) => this.filteredOrganizationsSubject$.next(filterResult))
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

  setFilter(filterSet: IOrganizationFilter): void {
    this.filterConfigSubject$.next(filterSet)
  }

  private getFilterResult$(filterSet: IOrganizationFilter): Observable<IOrganization[]> {
    if (this.organizations.length) {
      return of(this.filterItems(this.organizations, filterSet))
    } else {
      return this.getAll().pipe(
        map((organizationArray) => {
          return this.filterItems(organizationArray, filterSet)
        })
      )
    }
  }

  filterItems(allOrganizations: IOrganization[], filterSet: IOrganizationFilter): IOrganization[] {
    let result: IOrganization[] = allOrganizations

    if (filterSet.searchText && filterSet.searchText.length) {
      const textFilter = filterSet.searchText.toUpperCase()
      result = allOrganizations.filter((organization) =>
        organization.name.toUpperCase().includes(textFilter)
      )
    }

    return result
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
