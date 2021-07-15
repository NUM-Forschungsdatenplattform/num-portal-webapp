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
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { ICohortPreviewApi } from 'src/app/shared/models/cohort-preview.interface'
import { ICohortGroupApi } from 'src/app/shared/models/project/cohort-group-api.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

@Component({
  selector: 'num-patient-filter',
  templateUrl: './patient-filter.component.html',
  styleUrls: ['./patient-filter.component.scss'],
})
export class PatientFilterComponent implements OnInit {
  determineHits: IDetermineHits = {
    defaultMessage: 'AQL.HITS.MESSAGE_SET_ALL_PARAMETERS',
    count: null,
  }
  patientCount$: Observable<number>
  previewData$: Observable<ICohortPreviewApi>
  project: ProjectUiModel

  get cohortNode(): CohortGroupUiModel {
    return this.project.cohortGroup
  }

  constructor(
    private patientFilterService: PatientFilterService,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.setCurrentProject()
    this.patientCount$ = this.patientFilterService.totalDatasetCountObservable$
    this.previewData$ = this.patientFilterService.previewDataObservable$

    this.patientFilterService.getAllDatasetCount().subscribe()
  }

  setCurrentProject(): void {
    this.patientFilterService.getCurrentProject().subscribe(
      (project) => {
        this.project = project
      },
      (_) => {
        this.project = new ProjectUiModel()
      }
    )
  }

  private updateDetermineHits(count?: number | null, message?: string, isLoading = false): void {
    this.determineHits = {
      defaultMessage: this.determineHits.defaultMessage,
      message,
      count,
      isLoading,
    }
  }

  async getPreviewData(): Promise<void> {
    if (!this.cohortNode) {
      this.updateDetermineHits(null, '')
    } else {
      try {
        this.updateDetermineHits(null, '', true)
        const cohortGroupApi: ICohortGroupApi = this.cohortNode.convertToApi()
        const previewData = await this.patientFilterService
          .getPreviewData(cohortGroupApi, false)
          .toPromise()
        this.updateDetermineHits(previewData.count, '')
      } catch (error) {
        if (error.status === 451) {
          // *** Error 451 means too few hits ***
          this.updateDetermineHits(null, 'PROJECT.HITS.MESSAGE_ERROR_FEW_HITS')
        } else {
          this.updateDetermineHits(null, 'PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
        }
      }
    }
  }

  goToDataFilter(): void {
    const { cohortGroup } = this.project.convertToApiInterface()
    if (cohortGroup) {
      this.patientFilterService.setCurrentProject(this.project)
      this.router.navigate(['search/data-filter'], {})
    } else {
      this.toastMessageService.openToast({
        type: ToastMessageType.Error,
        message: 'PROJECT.NO_AQL_ERROR_MESSAGE',
      })
    }
  }
}
