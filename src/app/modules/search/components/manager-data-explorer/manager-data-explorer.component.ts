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
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { AqbUiModel } from 'src/app/shared/models/aqb/aqb-ui.model'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { RESULT_SET_LOADING_ERROR } from './constants'

@Component({
  selector: 'num-manager-data-explorer',
  templateUrl: './manager-data-explorer.component.html',
  styleUrls: ['./manager-data-explorer.component.scss'],
})
export class ManagerDataExplorerComponent implements OnDestroy, OnInit {
  private subscriptions = new Subscription()

  aqbModel = new AqbUiModel()
  currentProject: ProjectUiModel
  isDataSetLoading = false
  isExportLoading = false
  resultSet: IAqlExecutionResponse[]

  constructor(
    private patientFilterService: PatientFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.currentProject = this.route.snapshot.data.resolvedData
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  goBack(): void {
    this.patientFilterService.setCurrentProject(this.currentProject)
    this.router.navigate(['search', 'data-filter'])
  }

  getData(): void {
    this.isDataSetLoading = true
    this.subscriptions.add(
      this.patientFilterService
        .getProjectData(
          {
            id: null,
            cohortGroup: this.currentProject.convertToApiInterface().cohortGroup,
            name: 'Preview Cohort',
            projectId: null,
            description: '',
          },
          this.currentProject.templates.map((template) => template.templateId)
        )
        .subscribe(
          (result) => {
            this.resultSet = result
            this.isDataSetLoading = false
          },
          () => {
            this.isDataSetLoading = false
            this.toastMessageService.openToast(RESULT_SET_LOADING_ERROR)
          }
        )
    )
  }
}
