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
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { IProjectResolved } from '../../models/project-resolved.interface'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { of, Subscription } from 'rxjs'
import { ApprovalOption } from '../../models/approval-option.enum'
import { catchError, tap } from 'rxjs/operators'
import { APPROVE_PROJECT_DIALOG_CONFIG } from './constants'
import { ConnectorNodeType } from '../../../../shared/models/connector-node-type.enum'
import { AdminService } from '../../../../core/services/admin/admin.service'
import { CohortService } from '../../../../core/services/cohort/cohort.service'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { ProfileService } from '../../../../core/services/profile/profile.service'
import { ProjectService } from '../../../../core/services/project/project.service'
import { ToastMessageService } from '../../../../core/services/toast-message/toast-message.service'
import { downloadFile } from '../../../../core/utils/download-file.utils'
import { IDetermineHits } from '../../../../shared/components/editor-determine-hits/determine-hits.interface'
import { ICohortApi } from '../../../../shared/models/project/cohort-api.interface'
import { CohortGroupUiModel } from '../../../../shared/models/project/cohort-group-ui.model'
import { PossibleProjectEditorMode } from '../../../../shared/models/project/possible-project-editor-mode.enum'
import { IProjectApi } from '../../../../shared/models/project/project-api.interface'
import { IProjectComment } from '../../../../shared/models/project/project-comment.interface'
import { ProjectStatus } from '../../../../shared/models/project/project-status.enum'
import { ProjectUiModel } from '../../../../shared/models/project/project-ui.model'
import { ToastMessageType } from '../../../../shared/models/toast-message-type.enum'

@Component({
  selector: 'num-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss'],
})
export class ProjectEditorComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  mode: PossibleProjectEditorMode
  possibleModes = PossibleProjectEditorMode

  determineHitsContent: IDetermineHits

  resolvedData: IProjectResolved
  isResearchersFetched: boolean
  isCohortsFetched: boolean
  isCommentsFetched: boolean

  isTemplatesDisabled: boolean
  isResearchersDisabled: boolean
  isGeneralInfoDisabled: boolean
  isCohortBuilderDisabled: boolean

  isExportLoading: boolean

  projectComments: IProjectComment[] = []

  generalInfoData: IDefinitionList[]
  get project(): ProjectUiModel {
    return this.resolvedData.project
  }

  get cohortGroup(): CohortGroupUiModel {
    return this.project.cohortGroup
  }

  savedProjectStatus: ProjectStatus

  commentForm: FormGroup
  projectForm: FormGroup
  approverForm: FormGroup

  isCohortValid: any

  isUserProjectAdmin: boolean

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private cohortService: CohortService,
    private adminService: AdminService,
    private dialogService: DialogService,
    private toast: ToastMessageService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.isCohortValid = {
      hasAql: null,
      valid: null,
    }

    this.resolvedData = this.route.snapshot.data.resolvedData
    this.savedProjectStatus = this.resolvedData.project.status
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => this.handleQueryParams(params))
    )

    this.generateForm()
    this.fetchCohort()
    this.fetchResearcher()
    this.fetchComments()
    this.getGeneralInfoListData()

    this.determineHitsContent = {
      defaultMessage: 'PROJECT.HITS.MESSAGE_SET_ALL_PARAMETERS',
    }
    this.profileService.get().subscribe((user) => {
      this.isUserProjectAdmin = user.id === this.project.coordinator.id
    })
  }

  updateDetermineHits(count?: number | null, message?: string, isLoading = false): void {
    this.determineHitsContent = {
      defaultMessage: this.determineHitsContent.defaultMessage,
      message,
      count,
      isLoading,
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleQueryParams(params: Params): void {
    const mode = ('' + params.mode).toUpperCase()
    if (mode in PossibleProjectEditorMode) {
      this.mode = PossibleProjectEditorMode[mode]
    } else if (this.project.id === null) {
      this.mode = PossibleProjectEditorMode.EDIT
    } else {
      this.mode = PossibleProjectEditorMode.PREVIEW
    }
    this.checkVisibility()
    document.querySelector('mat-sidenav-content')?.scrollTo(0, 0)
  }

  fetchCohort(): void {
    if (this.project.cohortId === null || this.project.cohortId === undefined) {
      this.isCohortsFetched = true
    } else {
      this.cohortService.get(this.project.cohortId).subscribe((cohortApi) => {
        this.project.addCohortGroup(cohortApi?.cohortGroup)
        this.isCohortsFetched = true
      })
    }
  }

  fetchResearcher(): void {
    const userIds = this.project.researchersApi.map((researcher) => researcher.userId)
    if (!userIds.length) {
      this.isResearchersFetched = true
    } else {
      this.adminService.getUsersByIds(userIds).subscribe((researchers) => {
        this.project.researchers = researchers
        this.isResearchersFetched = true
      })
    }
  }

  fetchComments(): void {
    if (this.project.id === null || this.project.id === undefined) {
      this.isCommentsFetched = true
    } else {
      this.projectService.getCommentsByProjectId(this.project.id).subscribe((comments) => {
        this.projectComments = comments
        this.isCommentsFetched = true
      })
    }
  }

  generateForm(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(this.project?.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.project?.description, [
        Validators.required,
        Validators.minLength(3),
      ]),
      simpleDescription: new FormControl(this.project?.simpleDescription, [
        Validators.required,
        Validators.minLength(3),
      ]),
      goal: new FormControl(this.project?.goal, [Validators.required, Validators.minLength(3)]),
      firstHypotheses: new FormControl(this.project?.firstHypotheses, [
        Validators.required,
        Validators.minLength(3),
      ]),
      secondHypotheses: new FormControl(this.project?.secondHypotheses),
      keywords: new FormControl(this.project?.keywords),
      categories: new FormControl(this.project?.categories),
      startDate: new FormControl(this.project?.startDate, [Validators.required]),
      endDate: new FormControl(this.project?.endDate, [Validators.required]),
      financed: new FormControl(this.project?.financed),
      usedOutsideEu: new FormControl(this.project?.usedOutsideEu),
    })

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    this.approverForm = new FormGroup({
      decision: new FormControl(ApprovalOption.Approve, Validators.required),
    })
  }

  getProjectForApi(): { project: IProjectApi; cohort: ICohortApi } {
    const id = this.project.id === 0 ? null : this.project.id
    const formValues = this.projectForm.value

    const { project, cohortGroup } = this.project.convertToApiInterface(id, formValues)
    const cohort: ICohortApi = {
      cohortGroup,
      id: project.cohortId || null,
      name: project.name,
      projectId: project.id,
      description: project.description,
    }

    return { project, cohort }
  }

  getGeneralInfoListData(): void {
    this.generalInfoData = this.project.getProjectPreviewGeneralInfo()
  }

  saveCohort(cohort: ICohortApi): Promise<ICohortApi> {
    if (cohort.id === null || cohort.id === undefined) {
      return this.cohortService.create(cohort).toPromise()
    } else {
      return this.cohortService.update(cohort, cohort.id).toPromise()
    }
  }

  saveProject(project: IProjectApi): Promise<IProjectApi> {
    if (project.id === null || project.id === undefined) {
      return this.projectService.create(project).toPromise()
    } else {
      return this.projectService.update(project, project.id).toPromise()
    }
  }

  startEdit(): void {
    const queryParams = { mode: PossibleProjectEditorMode.EDIT.toString().toLowerCase() }
    this.router.navigate(['projects', this.project.id, 'editor'], { queryParams })
  }

  async save(withCohort = true): Promise<void> {
    const { project, cohort } = this.getProjectForApi()
    try {
      const projectResult = await this.saveProject(project)
      this.savedProjectStatus = projectResult.status
      this.project.id = projectResult.id

      if (withCohort && cohort.cohortGroup) {
        cohort.projectId = projectResult.id
        const cohortResult = await this.saveCohort(cohort)
        this.project.cohortId = cohortResult.id
      }

      this.router.navigate(['projects'])

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'PROJECT.SAVE_SUCCESS_MESSAGE',
      })
    } catch (error) {
      this.project.status = this.savedProjectStatus
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'PROJECT.SAVE_ERROR_MESSAGE',
      })
    }
  }

  async sendForApproval(): Promise<void> {
    const { cohort } = this.getProjectForApi()
    if (cohort.cohortGroup) {
      this.project.status = ProjectStatus.Pending
      await this.save()
    } else {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'PROJECT.NO_QUERY_ERROR_MESSAGE',
      })
    }
  }

  saveResearchers(): void {
    this.save(false)
  }

  saveAsApprovalReply(): void {
    const decision = this.approverForm.value.decision as ApprovalOption

    switch (decision) {
      case ApprovalOption.Approve:
        this.handleApprovalWithDialog()
        break
      case ApprovalOption.ChangeRequest:
        this.updateProjectStatus(ProjectStatus.ChangeRequest)
        break
      case ApprovalOption.Deny:
        this.updateProjectStatus(ProjectStatus.Denied)
        break
    }
  }

  handleApprovalWithDialog(): void {
    const dialogRef = this.dialogService.openDialog(APPROVE_PROJECT_DIALOG_CONFIG)

    dialogRef.afterClosed().subscribe((confirmResult: boolean | undefined) => {
      if (confirmResult === true) {
        this.updateProjectStatus(ProjectStatus.Approved)
      }
    })
  }

  updateProjectStatus(newStatus: ProjectStatus): void {
    this.projectService
      .updateStatusById(this.project.id, newStatus)
      .pipe(
        tap(() => {
          this.router.navigate(['/projects'])
        }),
        catchError((error) => {
          // TODO: Show message to user
          console.log(error)
          return of(error)
        })
      )
      .subscribe()
  }

  private checkNode(node) {
    if (node.type === ConnectorNodeType.Aql) {
      this.isCohortValid.hasAql = true
    }

    if (
      typeof node['areParameterConfigured'] !== 'undefined' &&
      node.areParameterConfigured === false
    ) {
      this.isCohortValid.valid = false
    }
  }

  private everyCohortDescendants(nodeParam): any {
    if (nodeParam.children) {
      for (let i = 0; i < nodeParam.children.length; i++) {
        const child = nodeParam.children[i]
        this.everyCohortDescendants(child)
        this.checkNode(child)
      }
    }
  }

  checkCohortValidation(cohortNode) {
    this.isCohortValid.valid = true
    this.isCohortValid.hasAql = false
    this.everyCohortDescendants(cohortNode)
  }

  async determineHits(): Promise<void> {
    const { cohort } = this.getProjectForApi()

    this.checkCohortValidation(this.cohortGroup)

    if (this.isCohortValid.hasAql && this.isCohortValid.valid) {
      if (cohort && cohort.cohortGroup) {
        this.updateDetermineHits(null, '', true)
        const usedOutsideEu = this.projectForm.get('usedOutsideEu').value

        try {
          await this.cohortService
            .getSize(cohort.cohortGroup, usedOutsideEu)
            .toPromise()
            .then((result) => {
              this.updateDetermineHits(result, '')
            })
        } catch (error) {
          if (error.status === 451) {
            // *** Error 451 means too few hits ***
            this.updateDetermineHits(null, 'PROJECT.HITS.MESSAGE_ERROR_FEW_HITS')
          } else {
            this.updateDetermineHits(null, 'PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
          }
        }
      } else {
        this.updateDetermineHits(null, 'PROJECT.HITS.MESSAGE_SET_ALL_PARAMETERS')
      }
    }
  }

  cancel(): void {
    this.router.navigate(['projects'])
  }

  exportPrint(): void {
    const currentLang = 'de'
    this.isExportLoading = true

    this.subscriptions.add(
      this.projectService.exportPrint(this.project.id, currentLang).subscribe(
        (response) => {
          downloadFile(`${this.project.id}_${currentLang}`, 'txt', response)
          this.isExportLoading = false
        },
        () => {
          this.isExportLoading = false
        }
      )
    )
  }

  postComment(): void {
    const formValues = this.commentForm.value
    this.projectService
      .createCommentByProjectId(this.project.id, formValues.text)
      .subscribe((comment) => {
        this.commentForm.reset()
        this.commentForm.setErrors(null)
        this.projectComments.push(comment)
      })
  }

  checkVisibility(): void {
    const projectStatus = this.project.status
    const inPreview = this.mode === PossibleProjectEditorMode.PREVIEW
    const inReview = this.mode === PossibleProjectEditorMode.REVIEW
    const inEditByStatus = !(
      projectStatus !== ProjectStatus.Draft && projectStatus !== ProjectStatus.ChangeRequest
    )

    if (inEditByStatus && !inPreview && !inReview) {
      this.isCohortBuilderDisabled = false
      this.isGeneralInfoDisabled = false
      this.isTemplatesDisabled = false
      this.isResearchersDisabled = false
    } else {
      this.isCohortBuilderDisabled = true
      this.isGeneralInfoDisabled = true
      this.isTemplatesDisabled = true
      this.isResearchersDisabled = true
    }

    if (
      (projectStatus === ProjectStatus.Approved || projectStatus === ProjectStatus.Published) &&
      !inPreview &&
      !inReview
    ) {
      this.isResearchersDisabled = false
    }
  }
}
