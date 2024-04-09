import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { AuthService } from 'src/app/core/auth/auth.service'
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
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.userInfoObservable$.subscribe((userInfo) => (this.userInfo = userInfo))
  }

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<IProjectResolved> {
    const id = route.paramMap.get('id')

    if (isNaN(+id)) {
      this.router.navigate(['data-explorer/projects'])
      return of()
    }

    return this.projectService.get(+id).pipe(
      map((project) => {
        if (this.isAllowed(project)) {
          const uiModel = new ProjectUiModel(project)
          return { project: uiModel, error: null }
        } else {
          this.router.navigate(['data-explorer/projects'])
          return undefined
        }
      }),
      catchError((error) => {
        this.router.navigate(['data-explorer/projects'])
        return of(error)
      })
    )
  }

  isAllowed(project: IProjectApi): boolean {
    if (project.status === ProjectStatus.Published) {
      if (
        project.researchers.find((researcher) => this.userInfo.sub === researcher.userId) ||
        project.coordinator?.id === this.userInfo.sub
      ) {
        return true
      }
    }
    return false
  }
}
