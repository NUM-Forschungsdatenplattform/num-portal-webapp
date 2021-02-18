import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'

import { EMPTY, Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { IOrganizationResolved } from './models/organization-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class OrganizationResolver implements Resolve<IOrganizationResolved> {
  userProfile: IUserProfile

  constructor(
    private organizationService: OrganizationService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileService.userProfileObservable$.subscribe(
      (userProfile) => (this.userProfile = userProfile)
    )
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IOrganizationResolved> {
    const id = route.paramMap.get('id')

    if (id === 'new') {
      if (this.userProfile.roles.includes(AvailableRoles.OrganizationAdmin)) {
        this.router.navigate(['organizations', this.userProfile.organization.id, 'editor'])
        return EMPTY
      }
      return of({ organization: undefined, error: null })
    }

    return this.organizationService.get(id).pipe(
      map((organization) => {
        return { organization, error: null }
      }),
      catchError((error) => {
        this.router.navigate(['organizations'])
        return of(error)
      })
    )
  }
}
