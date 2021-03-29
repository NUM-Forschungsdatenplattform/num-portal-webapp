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
    private projectService: ProjectService,
    private phenotypeService: PhenotypeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.userInfoObservable$.subscribe((userInfo) => (this.userInfo = userInfo))
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProjectResolved> {
    const id = route.paramMap.get('id')

    if (isNaN(+id)) {
      this.router.navigate(['data-explorer/projects'])
      return of()
    }

    return this.projectService.get(+id).pipe(
      map((project) => {
        if (this.isAllowed(project)) {
          const uiModel = new ProjectUiModel(project, this.phenotypeService)
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
      if (project.researchers.find((researcher) => this.userInfo.sub === researcher.userId)) {
        return true
      }
    }
    return false
  }
}
