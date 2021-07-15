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
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin, Subscription } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { IAqbSelectClick } from 'src/app/shared/models/aqb/aqb-select-click.interface'
import { AqbUiModel } from 'src/app/shared/models/aqb/aqb-ui.model'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { AQL_LOADING_ERROR, RESULT_SET_LOADING_ERROR } from './constants'

@Component({
  selector: 'num-manager-data-explorer',
  templateUrl: './manager-data-explorer.component.html',
  styleUrls: ['./manager-data-explorer.component.scss'],
})
export class ManagerDataExplorerComponent implements OnInit {
  private subscriptions = new Subscription()

  aqbModel = new AqbUiModel()
  currentProject: ProjectUiModel
  isDataSetLoading = false
  isExportLoading = false
  isAqlPrepared = false
  resultSet: IAqlExecutionResponse[]
  compiledQuery: IArchetypeQueryBuilderResponse

  constructor(
    private aqlEditorService: AqlEditorService,
    private patientFilterService: PatientFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.currentProject = this.route.snapshot.data.resolvedData
    this.prepareAql()
  }

  goBack(): void {
    this.patientFilterService.setCurrentProject(this.currentProject)
    this.router.navigate(['search', 'data-filter'])
  }

  getData(): void {
    if (!!this.compiledQuery) {
      this.isDataSetLoading = true
      this.patientFilterService
        .getProjectData(
          this.compiledQuery.q,
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
    }
  }
  private prepareAql(): void {
    if (!!this.currentProject) {
      const selectedCompositions$ = this.currentProject.templates.map((template) =>
        this.aqlEditorService.getContainment(template.templateId).pipe(
          map((containment) => {
            return {
              compositionId: containment.archetypeId,
              templateId: template.templateId,
              item: {
                archetypeId: containment.archetypeId,
                displayName: containment.archetypeId,
              },
            } as IAqbSelectClick
          })
        )
      )

      this.subscriptions.add(
        forkJoin(selectedCompositions$)
          .pipe(
            mergeMap((selectedCompositions) => {
              selectedCompositions.forEach((composition) =>
                this.aqbModel.handleElementSelect(composition)
              )
              const apiModel = this.aqbModel.convertToApi()
              return this.aqlEditorService.buildAql(apiModel)
            })
          )
          .subscribe(
            (compiledQuery) => {
              this.compiledQuery = compiledQuery
              this.isAqlPrepared = true
            },
            () => {
              this.isDataSetLoading = false
              this.toastMessageService.openToast(AQL_LOADING_ERROR)
            }
          )
      )
    }
  }
}
