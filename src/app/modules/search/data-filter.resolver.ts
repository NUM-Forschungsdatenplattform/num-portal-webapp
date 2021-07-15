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
import { Resolve, Router } from '@angular/router'

import { EMPTY, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'

@Injectable({
  providedIn: 'root',
})
export class DataFilterResolver implements Resolve<ProjectUiModel> {
  constructor(private router: Router, private patientFilterService: PatientFilterService) {}

  resolve(): Observable<ProjectUiModel> {
    return this.patientFilterService.getCurrentProject().pipe(
      catchError(() => {
        this.router.navigate(['search'])
        return EMPTY
      })
    )
  }
}
