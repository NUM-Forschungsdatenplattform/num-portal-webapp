import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { ProfileService } from '../profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private baseUrl: string

  private organizations: IOrganization[] = []
  private organizationsSubject$ = new BehaviorSubject(this.organizations)
  public organizationsObservable$ = this.organizationsSubject$.asObservable()

  constructor(
    private httpClient: HttpClient,
    appConfig: AppConfigService,
    private profileService: ProfileService
  ) {
    this.baseUrl = `${appConfig.config.api.baseUrl}/organization`
  }

  getAll(): Observable<IOrganization[]> {
    return this.profileService.userProfileObservable$.pipe(
      filter((userProfile) => userProfile.id !== undefined),
      take(1),
      switchMap((userProfile: IUserProfile) => {
        if (!userProfile.roles.includes(AvailableRoles.SuperAdmin)) {
          this.organizations = [userProfile.organization]
          this.organizationsSubject$.next([userProfile.organization])
          return of([userProfile.organization])
        } else {
          return this.httpClient.get<IOrganization[]>(this.baseUrl).pipe(
            tap((organizations) => {
              this.organizations = organizations
              this.organizationsSubject$.next(organizations)
            }),
            catchError(this.handleError)
          )
        }
      })
    )
  }

  get(id: string): Observable<IOrganization> {
    return this.httpClient
      .get<IOrganization>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
