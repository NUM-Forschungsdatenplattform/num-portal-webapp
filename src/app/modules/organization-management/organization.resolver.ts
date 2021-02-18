import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IOrganizationResolved } from './models/organization-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class OrganizationResolver implements Resolve<IOrganizationResolved> {
  constructor(private organizationService: OrganizationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IOrganizationResolved> {
    const id = route.paramMap.get('id')

    if (id === 'new') {
      return of({ organization: undefined, error: null })
    }

    return this.organizationService.get(id).pipe(
      map((organization) => {
        return { organization: organization, error: null }
      }),
      catchError((error) => {
        return of({ organization: undefined, error })
      })
    )
  }
}
