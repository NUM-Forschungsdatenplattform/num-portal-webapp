import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'

import { Observable, of } from 'rxjs'
import { map, catchError, timeout, filter, take } from 'rxjs/operators'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
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

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IOrganizationResolved> {
    const id = route.paramMap.get('id')

    return this.profileService.userProfileObservable$.pipe(
      filter((profile) => profile.id !== undefined),
      take(1),
      map((userProfile: IUserProfile) => {
        if (!userProfile.roles.includes(AvailableRoles.SuperAdmin)) {
          if (id !== userProfile.organization.id) {
            return this.router.navigate(['organizations', userProfile.organization.id, 'editor'])
          }
          return { organization: userProfile.organization, error: null }
        } else {
          if (id === 'new') {
            return { organization: undefined, error: null }
          }
          this.organizationService.get(id).pipe(
            map((organization) => {
              return { organization, error: null }
            }),
            catchError((error) => {
              this.router.navigate(['organizations'])
              return of(error)
            })
          )
        }
      }),
      timeout(10000),
      catchError((error) => {
        this.router.navigate(['organizations'])
        return of(error)
      })
    )
  }
}
