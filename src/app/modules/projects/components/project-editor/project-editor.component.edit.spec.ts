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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject, throwError } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { PossibleProjectEditorMode } from 'src/app/shared/models/project/possible-project-editor-mode.enum'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import {
  projectCommentMock1,
  projectCommentMocks,
} from 'src/mocks/data-mocks/project-comments.mock'
import { ApprovalOption } from '../../models/approval-option.enum'
import { IProjectResolved } from '../../models/project-resolved.interface'
import { APPROVE_PROJECT_DIALOG_CONFIG } from './constants'

import { ProjectEditorComponent } from './project-editor.component'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

describe('ProjectEditorComponent', () => {
  let component: ProjectEditorComponent
  let fixture: ComponentFixture<ProjectEditorComponent>
  let router: Router

  const projectService = ({
    create: jest.fn(),
    update: jest.fn(),
    getCommentsByProjectId: jest.fn(),
    createCommentByProjectId: jest.fn(),
    updateStatusById: jest.fn(),
  } as unknown) as ProjectService

  const cohortService = ({
    create: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
  } as unknown) as CohortService

  const adminService = ({
    getUsersByIds: jest.fn(),
  } as unknown) as AdminService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  const resolvedData: IProjectResolved = {
    project: new ProjectUiModel(mockProject1),
    error: null,
  }

  const queryParamsSubject$ = new BehaviorSubject<Params>({})
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
    queryParams: queryParamsSubject$.asObservable(),
  } as unknown) as ActivatedRoute

  const mockToast = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  @Component({ selector: 'num-project-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
    @Input() isDisabled: boolean
    @Input() generalInfoData: IDefinitionList[]
  }

  @Component({ selector: 'num-project-editor-cohort-builder', template: '' })
  class StubProjectEditorCohortBuilderComponent {
    @Input() cohortNode: CohortGroupUiModel
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
  }

  @Component({ selector: 'num-project-editor-researchers', template: '' })
  class ProjectEditorResearchers {
    @Input() researchers: any[]
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
  }

  @Component({ selector: 'num-project-editor-templates', template: '' })
  class ProjectEditorTemplatesStubComponent {
    @Input() templates: any
    @Input() isDisabled: boolean
  }

  const postCommentEmitter = new EventEmitter()
  @Component({ selector: 'num-project-editor-comments', template: '' })
  class ProjectEditorCommentsStubComponent {
    @Input() isLoadingComplete: any
    @Input() comments: any[]
    @Input() form: any
    @Output() postComment = postCommentEmitter
  }

  @Component({ selector: 'num-project-editor-approval', template: '' })
  class ProjectEditorApprovalStubComponent {
    @Input() form: any
  }

  const saveAllEmitter = new EventEmitter()
  const saveResearchersEmitter = new EventEmitter()
  const saveAsApprovalRequestEmitter = new EventEmitter()
  const saveAsApprovalReplyEmitter = new EventEmitter()
  const startEditEmitter = new EventEmitter()
  const cancelEmitter = new EventEmitter()
  @Component({ selector: 'num-project-editor-buttons', template: '' })
  class ProjectEditorButtonsStubComponent {
    @Input() editorMode: any
    @Input() projectStatus: any
    @Input() isFormValid: any
    @Input() isResearchersDefined: any
    @Input() isTemplatesDefined: any
    @Input() isCohortDefined: any
    @Input() approverForm: any

    @Output() saveAll = saveAllEmitter
    @Output() saveResearchers = saveResearchersEmitter
    @Output() saveAsApprovalRequest = saveAsApprovalRequestEmitter
    @Output() saveAsApprovalReply = saveAsApprovalReplyEmitter
    @Output() startEdit = startEditEmitter
    @Output() cancel = cancelEmitter
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorComponent,
        StubGeneralInfoComponent,
        StubProjectEditorCohortBuilderComponent,
        ProjectEditorResearchers,
        ButtonComponent,
        ProjectEditorTemplatesStubComponent,
        ProjectEditorButtonsStubComponent,
        ProjectEditorCommentsStubComponent,
        ProjectEditorApprovalStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([{ path: '**', redirectTo: '' }]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: ProjectService,
          useValue: projectService,
        },
        {
          provide: CohortService,
          useValue: cohortService,
        },
        {
          provide: AdminService,
          useValue: adminService,
        },
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToast,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    jest.restoreAllMocks()
    jest.clearAllMocks()
    jest.spyOn(router, 'navigate').mockImplementation()
    jest.spyOn(cohortService, 'get').mockImplementation(() => of(mockCohort1))
    jest.spyOn(cohortService, 'update').mockImplementation(() => of(mockCohort1))
    jest.spyOn(adminService, 'getUsersByIds').mockImplementation(() => of(mockUsers))
    jest
      .spyOn(projectService, 'getCommentsByProjectId')
      .mockImplementation(() => of(projectCommentMocks))
    jest.spyOn(projectService, 'update').mockImplementation(() => of(mockProject1))
    jest.spyOn(projectService, 'updateStatusById').mockImplementation(() => of(mockProject1))
  })

  describe('When the components gets initialized and the cohortId is not specified', () => {
    test.each([null, undefined])('should flag the cohorts as fetched', (cohortId) => {
      const cohortIdBackup = resolvedData.project.cohortId
      resolvedData.project.cohortId = cohortId
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      expect(component.isCohortsFetched).toBeTruthy()
      resolvedData.project.cohortId = cohortIdBackup
    })
  })

  describe('When the components gets initialized and the researchers are not specified', () => {
    it('should flag the researchers as fetched', () => {
      resolvedData.project.researchersApi = []
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      expect(component.isResearchersFetched).toBeTruthy()
    })
  })

  describe('When the components gets initialized and the cohortId is specified', () => {
    it('should call the cohortService to get the cohort and flag the cohort as fetched', async (done) => {
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
      component.resolvedData.project = new ProjectUiModel(mockProject1)
      expect(cohortService.get).toHaveBeenLastCalledWith(mockProject1.cohortId)

      fixture.whenStable().then(() => {
        expect(component.isCohortsFetched).toBeTruthy()
        done()
      })
    })
  })

  describe('When the components gets initialized and the researchers are specified', () => {
    it('should call the adminService to get the researchers and flag the researchers as fetched', async (done) => {
      const users = [{ userId: 'abc-1' }, { userId: 'abc-2' }]
      resolvedData.project.researchersApi = users
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      expect(adminService.getUsersByIds).toHaveBeenLastCalledWith([
        ...users.map((user) => user.userId),
      ])

      fixture.whenStable().then(() => {
        expect(component.isResearchersFetched).toBeTruthy()
        done()
      })
    })
  })

  describe('When the components gets initialized and the projectId is specified', () => {
    it('should call the project service to fetch related comments and flag comments as fetched', async (done) => {
      resolvedData.project.id = 1
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(projectService.getCommentsByProjectId).toHaveBeenCalledWith(1)
      fixture.whenStable().then(() => {
        expect(component.isCommentsFetched).toBeTruthy()
        expect(component.projectComments).toEqual(projectCommentMocks)
        done()
      })
    })
  })

  describe('When the comment component emits the event to post a comment', () => {
    beforeEach(() => {
      resolvedData.project.id = 1
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      jest
        .spyOn(projectService, 'createCommentByProjectId')
        .mockImplementation(() => of(projectCommentMock1))

      component.commentForm.patchValue({ text: 'Test 123' })
    })
    it('should call the project service to create the comment', () => {
      postCommentEmitter.emit()
      expect(projectService.createCommentByProjectId).toHaveBeenCalledWith(1, 'Test 123')
    })

    it('should reset the form after posting', () => {
      expect(component.commentForm.value.text).not.toEqual(null)
      postCommentEmitter.emit()
      expect(component.commentForm.value.text).toEqual(null)
    })
  })

  describe('When the buttons component emits to saveAll', () => {
    beforeEach(() => {
      resolvedData.project.id = 1
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
      saveAllEmitter.emit('')
    })

    it('should update the project if its an existing project', () => {
      expect(projectService.update).toHaveBeenCalledTimes(1)
    })

    it('should update the cohort if its an existing cohort', () => {
      expect(cohortService.update).toHaveBeenCalledTimes(1)
    })
  })

  describe('When project is Saved', () => {
    it('should navigate to projects and show success message on Success', async (done) => {
      component.save().then(() => {
        expect(mockToast.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Success,
          message: 'PROJECT.SAVE_SUCCESS_MESSAGE',
        })

        done()
      })
    })

    it('should NOT navigate and show Error message on Failure to Save', async (done) => {
      jest.spyOn(projectService, 'update').mockImplementationOnce(() => throwError({}))

      component.save().then(() => {
        expect(mockToast.openToast).toHaveBeenCalledWith({
          type: ToastMessageType.Error,
          message: 'PROJECT.SAVE_ERROR_MESSAGE',
        })

        done()
      })
    })
  })

  describe('When the buttons component emits to saveResearchers', () => {
    it('should update the project if its an existing project', () => {
      resolvedData.project.id = 1
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance
      jest.spyOn(component, 'save')

      fixture.detectChanges()
      saveResearchersEmitter.emit()
      expect(component.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the buttons component emits to startEdit', () => {
    it('should navigate to the editor with the project id and edit mode', () => {
      resolvedData.project.id = 1
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
      startEditEmitter.emit()

      const queryParams = { mode: PossibleProjectEditorMode.EDIT.toString().toLowerCase() }

      expect(router.navigate).toHaveBeenCalledWith(
        ['projects', resolvedData.project.id, 'editor'],
        {
          queryParams,
        }
      )
    })
  })

  describe('When the buttons component emits to cancel', () => {
    it('should navigate back to the projects overview', () => {
      resolvedData.project.id = 1
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
      cancelEmitter.emit()
      expect(router.navigate).toHaveBeenCalledWith(['projects'])
    })
  })

  describe('When the buttons component emits to save as approval reply', () => {
    beforeEach(() => {
      resolvedData.project.id = 1
      fixture = TestBed.createComponent(ProjectEditorComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
    })

    const testCases = [
      {
        decision: ApprovalOption.Approve,
        newState: ProjectStatus.Approved,
      },
      {
        decision: ApprovalOption.ChangeRequest,
        newState: ProjectStatus.ChangeRequest,
      },
      {
        decision: ApprovalOption.Deny,
        newState: ProjectStatus.Denied,
      },
    ]

    test.each(testCases)(
      'should call the project service with the new state and navigate to overview',
      (testCase) => {
        component.approverForm = new FormGroup({
          decision: new FormControl(testCase.decision, Validators.required),
        })
        saveAsApprovalReplyEmitter.emit()
        if (testCase.decision === ApprovalOption.Approve) {
          afterClosedSubject$.next(true)
        }
        expect(projectService.updateStatusById).toHaveBeenCalledWith(1, testCase.newState)
        expect(router.navigate).toHaveBeenCalledWith(['/projects'])
      }
    )

    it('should open the dialog to confirm the approval on approval decision and do nothing on cancel', () => {
      component.approverForm = new FormGroup({
        decision: new FormControl(ApprovalOption.Approve, Validators.required),
      })
      saveAsApprovalReplyEmitter.emit()
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(APPROVE_PROJECT_DIALOG_CONFIG)
      afterClosedSubject$.next(false)
      expect(projectService.updateStatusById).not.toHaveBeenCalledWith(1, ProjectStatus.Approved)
      expect(router.navigate).not.toHaveBeenCalledWith(['/projects'])
    })
  })
})
