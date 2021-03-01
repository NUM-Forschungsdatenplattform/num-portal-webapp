import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of, throwError } from 'rxjs'
import { map, catchError, timeout, filter, take, mergeMap } from 'rxjs/operators'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { OrganizationUiModel } from 'src/app/shared/models/organization/organization-ui.model'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { IOrganizationResolved } from './models/organization-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class OrganizationResolver implements Resolve<IOrganizationResolved> {
  constructor(
    private organizationService: OrganizationService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  private isSuperAdmin(userProfile: IUserProfile): boolean {
    return userProfile.roles.includes(AvailableRoles.SuperAdmin)
  }

  private isOwnOrganisation(userProfile: IUserProfile, id: number): boolean {
    return id === userProfile.organization.id
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IOrganizationResolved> {
    const requestedId = route.paramMap.get('id')

    return this.profileService.userProfileObservable$.pipe(
      filter((profile) => profile.id !== undefined),
      take(1),
      map((userProfile: IUserProfile) => {
        if (!this.isSuperAdmin(userProfile) && !this.isOwnOrganisation(userProfile, +requestedId)) {
          this.router.navigate(['organizations', userProfile.organization.id, 'editor'])
          throwError(new Error('Forbidden to modify as organization admin'))
        } else {
          return isNaN(+requestedId) ? 'new' : +requestedId
        }
      }),
      mergeMap((allowedId: 'new' | number) => {
        if (allowedId === 'new') {
          return of({ organization: new OrganizationUiModel(), error: null })
        }
        return this.organizationService.get(allowedId).pipe(
          map((organization) => {
            return { organization: new OrganizationUiModel(organization), error: null }
          })
        )
      }),
      timeout(10000),
      catchError((error) => {
        this.router.navigate(['organizations'])
        return throwError(error)
      })
    )
  }
}
