import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { AuthService } from 'src/app/core/auth/auth.service'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { IProjectResolved } from '../projects/models/project-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class DataExplorerResolver implements Resolve<IProjectResolved> {
  userInfo: IAuthUserInfo

  constructor(
    private studyService: ProjectService,
    private phenotypeService: PhenotypeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.userInfoObservable$.subscribe((userInfo) => (this.userInfo = userInfo))
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProjectResolved> {
    const id = route.paramMap.get('id')

    if (isNaN(+id)) {
      this.router.navigate(['data-explorer/studies'])
      return of()
    }

    return this.studyService.get(+id).pipe(
      map((study) => {
        if (this.isAllowed(study)) {
          const uiModel = new ProjectUiModel(study, this.phenotypeService)
          return { project: uiModel, error: null }
        } else {
          this.router.navigate(['data-explorer/studies'])
          return undefined
        }
      }),
      catchError((error) => {
        this.router.navigate(['data-explorer/studies'])
        return of(error)
      })
    )
  }

  isAllowed(study: IProjectApi): boolean {
    if (study.status === ProjectStatus.Published) {
      if (study.researchers.find((researcher) => this.userInfo.sub === researcher.userId)) {
        return true
      }
    }
    return false
  }
}
