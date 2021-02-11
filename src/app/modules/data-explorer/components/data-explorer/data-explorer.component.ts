import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { IAqbSelectClick } from 'src/app/modules/aqls/models/aqb/aqb-select-click.interface'
import { AqbUiModel } from 'src/app/modules/aqls/models/aqb/aqb-ui.model'
import { IStudyResolved } from 'src/app/modules/studies/models/study-resolved.interface'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { BUILDER_DIALOG_CONFIG, COMPOSITION_LOADING_ERROR } from './constants'

@Component({
  selector: 'num-data-explorer',
  templateUrl: './data-explorer.component.html',
  styleUrls: ['./data-explorer.component.scss'],
})
export class DataExplorerComponent implements OnInit {
  resolvedData: IStudyResolved

  aqbModel = new AqbUiModel()
  compiledQuery: IArchetypeQueryBuilderResponse
  selectedTemplateIds: string[] = []
  allowedTemplateIds: string[] = []

  isResearchersFetched: boolean
  isCohortsFetched: boolean
  isCompositionsFetched: boolean
  isDataSetLoading: boolean

  isTemplatesDisabled = true
  isResearchersDisabled = true
  isGeneralInfoDisabled = true
  isConnectorDisabled = true

  generalInfoData: IDefinitionList[]

  get study(): StudyUiModel {
    return this.resolvedData.study
  }

  get cohortGroup(): CohortGroupUiModel {
    return this.study.cohortGroup
  }

  studyForm: FormGroup = new FormGroup({})

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private adminService: AdminService,
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

  prefillAqlBuilder(): void {
    this.resolvedData.study.templates.forEach((template) => {
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
          this.isCompositionsFetched = true
        },
        () => {
          this.isCompositionsFetched = true
          this.toastMessageService.openToast(COMPOSITION_LOADING_ERROR)
        }
      )
  }

  fetchCohort(): void {
    if (this.study.cohortId === null || this.study.cohortId === undefined) {
      this.isCohortsFetched = true
    } else {
      this.cohortService.get(this.study.cohortId).subscribe((cohortApi) => {
        this.study.addCohortGroup(cohortApi?.cohortGroup)
        this.isCohortsFetched = true
      })
    }
  }

  fetchResearcher(): void {
    const userIds = this.study.researchersApi.map((researcher) => researcher.userId)
    if (!userIds.length) {
      this.isResearchersFetched = true
    } else {
      this.adminService.getUsersByIds(userIds).subscribe((researchers) => {
        this.study.researchers = researchers
        this.isResearchersFetched = true
      })
    }
  }

  getGeneralInfoListData(): void {
    this.generalInfoData = [
      { title: 'FORM.TITLE', description: this.study?.name },
      { title: 'FORM.DESCRIPTION', description: this.study?.description },
      { title: 'FORM.FIRST_HYPOTHESES', description: this.study?.firstHypotheses },
      { title: 'FORM.SECOND_HYPOTHESES', description: this.study?.secondHypotheses },
    ]
  }

  openBuilderDialog(): void {
    const dialogContentPayload: IAqlBuilderDialogInput = {
      model: this.aqbModel,
      mode: AqlBuilderDialogMode.DataExplorer,
      selectedTemplateIds: this.selectedTemplateIds,
      allowedTemplates: this.allowedTemplateIds,
    }

    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IAqlBuilderDialogOutput | undefined) => {
      if (confirmResult) {
        this.handleDialogConfirm(confirmResult)
      }
    })
  }

  handleDialogConfirm(confirmResult: IAqlBuilderDialogOutput): void {
    this.aqbModel = confirmResult.model
    this.selectedTemplateIds = confirmResult.selectedTemplateIds
    this.compiledQuery = confirmResult.result

    this.getDataSet()
  }

  getDataSet(): void {
    this.isDataSetLoading = true
    console.log('Next step: Get Dataset with aql: ', this.compiledQuery.q)
    this.isDataSetLoading = false
  }

  cancel(): void {
    this.router.navigate(['data-explorer/studies'])
  }
}
