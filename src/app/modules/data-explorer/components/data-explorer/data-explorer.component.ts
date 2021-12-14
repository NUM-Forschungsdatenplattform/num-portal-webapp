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
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin, Subscription } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { IAqbSelectClick } from 'src/app/shared/models/aqb/aqb-select-click.interface'
import { AqbUiModel } from 'src/app/shared/models/aqb/aqb-ui.model'
import { IProjectResolved } from 'src/app/modules/projects/models/project-resolved.interface'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { DataExplorerConfigurations } from 'src/app/shared/models/data-explorer-configurations.enum'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import {
  BUILDER_DIALOG_CONFIG,
  COMPOSITION_LOADING_ERROR,
  EXPORT_ERROR,
  RESULT_SET_LOADING_ERROR,
} from './constants'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { cloneDeep } from 'lodash-es'
import { downloadFile } from 'src/app/core/utils/download-file.utils'

@Component({
  selector: 'num-data-explorer',
  templateUrl: './data-explorer.component.html',
  styleUrls: ['./data-explorer.component.scss'],
})
export class DataExplorerComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  resolvedData: IProjectResolved

  initialAqbModel = new AqbUiModel()
  aqbModel = new AqbUiModel()
  compiledQuery: IArchetypeQueryBuilderResponse
  selectedTemplateIds: string[] = []
  allowedTemplateIds: string[] = []

  isResearchersFetched: boolean
  isCohortsFetched: boolean
  isCompositionsFetched: boolean
  isDataSetLoading: boolean

  isExportLoading: boolean

  isTemplatesDisabled = true
  isResearchersDisabled = true
  isGeneralInfoDisabled = true
  isCohortBuilderDisabled = true

  generalInfoData: IDefinitionList[]

  get project(): ProjectUiModel {
    return this.resolvedData.project
  }

  get cohortGroup(): CohortGroupUiModel {
    return this.project.cohortGroup
  }

  projectForm: FormGroup = new FormGroup({})

  resultSet: IAqlExecutionResponse[]
  configuration: DataExplorerConfigurations = DataExplorerConfigurations.Default

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private adminService: AdminService,
    private projectService: ProjectService,
    private dialogService: DialogService,
    private aqlEditorService: AqlEditorService,
    private toastMessageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData

    this.fetchCohort()
    this.fetchResearcher()
    this.getGeneralInfoListData()
    this.prefillAqlBuilder()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  prefillAqlBuilder(): void {
    this.resolvedData.project.templates.forEach((template) => {
      this.allowedTemplateIds.push(template.templateId)
      this.selectedTemplateIds.push(template.templateId)
    })

    const selectedCompositions$ = this.selectedTemplateIds.map((templateId) =>
      this.aqlEditorService.getContainment(templateId).pipe(
        map((containment) => {
          return {
            compositionId: containment.archetypeId,
            templateId,
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
            this.initialAqbModel = cloneDeep(this.aqbModel)
            return this.aqlEditorService.buildAql(apiModel)
          })
        )
        .subscribe(
          (compiledQuery) => {
            this.compiledQuery = compiledQuery
            this.isCompositionsFetched = true
          },
          () => {
            this.isCompositionsFetched = true
            this.toastMessageService.openToast(COMPOSITION_LOADING_ERROR)
          }
        )
    )
  }

  fetchCohort(): void {
    if (this.project.cohortId === null || this.project.cohortId === undefined) {
      this.isCohortsFetched = true
    } else {
      this.subscriptions.add(
        this.cohortService.get(this.project.cohortId).subscribe((cohortApi) => {
          this.project.addCohortGroup(cohortApi?.cohortGroup)
          this.isCohortsFetched = true
        })
      )
    }
  }

  fetchResearcher(): void {
    const userIds = this.project.researchersApi.map((researcher) => researcher.userId)
    if (!userIds.length) {
      this.isResearchersFetched = true
    } else {
      this.subscriptions.add(
        this.adminService.getUsersByIds(userIds).subscribe((researchers) => {
          this.project.researchers = researchers
          this.isResearchersFetched = true
        })
      )
    }
  }

  getGeneralInfoListData(): void {
    this.generalInfoData = this.project.getProjectPreviewGeneralInfo()
  }

  openBuilderDialog(): void {
    const dialogContentPayload: IAqlBuilderDialogInput = {
      model: this.aqbModel,
      mode: AqlBuilderDialogMode.DataRetrieval,
      selectedTemplateIds: this.selectedTemplateIds,
      allowedTemplates: this.allowedTemplateIds,
    }

    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((confirmResult: IAqlBuilderDialogOutput | undefined) => {
        if (confirmResult) {
          this.handleDialogConfirm(confirmResult)
        }
      })
    )
  }

  handleDialogConfirm(confirmResult: IAqlBuilderDialogOutput): void {
    this.aqbModel = confirmResult.model
    this.selectedTemplateIds = confirmResult.selectedTemplateIds
    this.compiledQuery = confirmResult.result

    this.configuration = DataExplorerConfigurations.Custom
    this.getDataSet()
  }

  resetAqbModel(): void {
    this.isDataSetLoading = true
    this.aqbModel = cloneDeep(this.initialAqbModel)
    this.selectedTemplateIds = cloneDeep(this.allowedTemplateIds)
    this.configuration = DataExplorerConfigurations.Default
    const apiModel = this.aqbModel.convertToApi()

    this.subscriptions.add(
      this.aqlEditorService.buildAql(apiModel).subscribe(
        (compiledQuery) => {
          this.compiledQuery = compiledQuery
          this.getDataSet()
        },
        (_) => {
          this.isDataSetLoading = false
          this.toastMessageService.openToast(COMPOSITION_LOADING_ERROR)
        }
      )
    )
  }

  cancel(): void {
    this.router.navigate(['data-explorer/projects'])
  }

  getDataSet(): void {
    this.isDataSetLoading = true
    const defaultConfiguration = this.configuration === DataExplorerConfigurations.Default

    this.subscriptions.add(
      this.projectService
        .executeAdHocAql(this.compiledQuery.q, this.project.id, defaultConfiguration)
        .subscribe(
          (resultSet) => {
            this.resultSet = resultSet
            this.isDataSetLoading = false
          },
          (_err) => {
            this.isDataSetLoading = false
            this.resultSet = undefined
            this.toastMessageService.openToast(RESULT_SET_LOADING_ERROR)
          }
        )
    )
  }

  exportFile(format: 'csv' | 'json'): void {
    if (!this.compiledQuery) return

    this.isExportLoading = true
    const defaultConfiguration = this.configuration === DataExplorerConfigurations.Default

    this.subscriptions.add(
      this.projectService
        .exportFile(this.project.id, this.compiledQuery.q, format, defaultConfiguration)
        .subscribe(
          (response) => {
            downloadFile(this.project.id, format, response)
            this.isExportLoading = false
          },
          () => {
            this.isExportLoading = false

            const messageConfig: IToastMessageConfig = {
              ...EXPORT_ERROR,
              messageParameters: {
                format: format.toUpperCase(),
              },
            }

            this.toastMessageService.openToast(messageConfig)
          }
        )
    )
  }
}
