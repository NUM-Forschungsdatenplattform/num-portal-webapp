import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { PossibleProjectEditorMode } from 'src/app/shared/models/project/possible-project-editor-mode.enum'
import { IProjectApi } from 'src/app/shared/models/project/project-api.interface'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { IProjectResolved } from './models/project-resolved.interface'

@Injectable({
  providedIn: 'root',
})
export class ProjectResolver implements Resolve<IProjectResolved> {
  constructor(
    private projectService: ProjectService,
    private phenotypeService: PhenotypeService,
    private router: Router
  ) {}

  shouldChangeStatusToReview(mode: string, project: IProjectApi): boolean {
    return (
      mode === PossibleProjectEditorMode.REVIEW.toString() &&
      project.status !== ProjectStatus.Reviewing
    )
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProjectResolved> {
    const id = route.paramMap.get('id')
    const mode = route.queryParamMap.get('mode')?.toUpperCase()

    if (id === 'new') {
      return of({ project: new ProjectUiModel(), error: null })
    }

    if (isNaN(+id)) {
      const message = `Id was not a number: ${id}`
      return of({ project: new ProjectUiModel(), error: message })
    }

    return this.projectService.get(+id).pipe(
      switchMap((project) => {
        if (this.shouldChangeStatusToReview(mode, project)) {
          return this.projectService.updateStatusById(project.id, ProjectStatus.Reviewing)
        } else {
          return of(project)
        }
      }),
      map((project) => {
        const uiModel = new ProjectUiModel(project, this.phenotypeService)
        return { project: uiModel, error: null }
      }),
      catchError((error) => {
        this.router.navigate(['/projects'])
        // TODO: Display message to user
        return of(error)
      })
    )
  }
}
