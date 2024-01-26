/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError, switchMap } from 'rxjs/operators'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { ICohortGroupApi } from 'src/app/shared/models/project/cohort-group-api.interface'
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
    private router: Router
  ) {}

  shouldChangeStatusToReview(mode: string, project: IProjectApi): boolean {
    return (
      mode === PossibleProjectEditorMode.REVIEW.toString() &&
      project.status !== ProjectStatus.Reviewing
    )
  }

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<IProjectResolved> {
    const id = route.paramMap.get('id')
    const mode = route.queryParamMap.get('mode')?.toUpperCase()

    if (id === 'new') {
      const projectPassedInRoute = this.router.getCurrentNavigation().extras.state?.project as {
        project: IProjectApi
        cohortGroup: ICohortGroupApi
      }
      if (projectPassedInRoute) {
        const project = new ProjectUiModel(projectPassedInRoute.project)
        project.addCohortGroup(projectPassedInRoute.cohortGroup)
        return of({ project, error: null })
      } else {
        return of({ project: new ProjectUiModel(), error: null })
      }
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
        const uiModel = new ProjectUiModel(project)
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
