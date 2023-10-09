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
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { IProjectResolved } from '../../models/project-resolved.interface'
import { ProjectEditorComponent } from './project-editor.component'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { RouterTestingModule } from '@angular/router/testing'
import { mockAql1, mockAql3 } from 'src/mocks/data-mocks/aqls.mock'
import { HttpErrorResponse } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AdminService } from 'projects/num-lib/src/lib/core/services/admin/admin.service'
import { CohortService } from 'projects/num-lib/src/lib/core/services/cohort/cohort.service'
import { ProfileService } from 'projects/num-lib/src/lib/core/services/profile/profile.service'
import { ProjectService } from 'projects/num-lib/src/lib/core/services/project/project.service'
import { ToastMessageService } from 'projects/num-lib/src/lib/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { ButtonComponent } from 'projects/num-lib/src/lib/shared/components/button/button.component'
import { IDetermineHits } from 'projects/num-lib/src/lib/shared/components/editor-determine-hits/determine-hits.interface'
import { AqlUiModel } from 'projects/num-lib/src/lib/shared/models/aql/aql-ui.model'
import { ConnectorNodeType } from 'projects/num-lib/src/lib/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'projects/num-lib/src/lib/shared/models/logical-operator.enum'
import { CohortGroupUiModel } from 'projects/num-lib/src/lib/shared/models/project/cohort-group-ui.model'
import { ProjectStatus } from 'projects/num-lib/src/lib/shared/models/project/project-status.enum'
import { ProjectUiModel } from 'projects/num-lib/src/lib/shared/models/project/project-ui.model'
import { ToastMessageType } from 'projects/num-lib/src/lib/shared/models/toast-message-type.enum'

describe('ProjectEditorComponent On Creation', () => {
  let component: ProjectEditorComponent
  let fixture: ComponentFixture<ProjectEditorComponent>

  const resolvedData: IProjectResolved = { project: new ProjectUiModel(), error: null }

  const queryParamsSubject$ = new BehaviorSubject<Params>({})
  const route = {
    snapshot: {
      data: {
        resolvedData,
      },
    },
    queryParams: queryParamsSubject$.asObservable(),
  } as unknown as ActivatedRoute

  const projectService = {
    create: jest.fn(),
    update: jest.fn(),
    getCommentsByProjectId: jest.fn(),
    updateStatusById: jest.fn(),
    exportPrint: jest.fn(),
  } as unknown as ProjectService

  const cohortService = {
    create: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
    getSize: jest.fn(),
  } as unknown as CohortService

  const adminService = {
    getUsersById: jest.fn(),
  } as unknown as AdminService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const profileService = {
    apiBase: jest.fn(),
    get: jest.fn(),
  }

  @Component({ selector: 'num-project-editor-accordion', template: '' })
  class StubProjectEditorAccordionComponent {
    @Input() isResearchersFetched: boolean
    @Input() isCohortsFetched: boolean
    @Input() isUserProjectAdmin: boolean
    @Input() isTemplatesDisabled: boolean
    @Input() isResearchersDisabled: boolean
    @Input() isGeneralInfoDisabled: boolean
    @Input() isCohortBuilderDisabled: boolean

    @Input() project: ProjectUiModel
    @Input() projectForm: FormGroup
    @Input() cohortGroup: CohortGroupUiModel
    @Input() generalInfoData: IDefinitionList[]

    @Input() determineHitsContent: IDetermineHits
    @Output() determineHitsClicked = new EventEmitter()
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
  const exportEmitter = new EventEmitter()
  @Component({ selector: 'num-project-editor-buttons', template: '' })
  class ProjectEditorButtonsStubComponent {
    @Input() editorMode: any
    @Input() projectStatus: any
    @Input() isFormValid: any
    @Input() isResearchersDefined: any
    @Input() isTemplatesDefined: any
    @Input() isCohortDefined: any
    @Input() approverForm: any
    @Input() isExportLoading: any
    @Input() isSavedProject: any

    @Output() saveAll = saveAllEmitter
    @Output() saveResearchers = saveResearchersEmitter
    @Output() saveAsApprovalRequest = saveAsApprovalRequestEmitter
    @Output() saveAsApprovalReply = saveAsApprovalReplyEmitter
    @Output() startEdit = startEditEmitter
    @Output() cancel = cancelEmitter
    @Output() exportPrint = exportEmitter
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorComponent,
        StubProjectEditorAccordionComponent,
        ButtonComponent,
        ProjectEditorButtonsStubComponent,
        ProjectEditorCommentsStubComponent,
        ProjectEditorApprovalStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        HttpClientTestingModule,
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
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
    jest.spyOn(profileService, 'apiBase').mockReturnValue('something')
    jest.spyOn(profileService, 'get').mockImplementation(() => {
      return of({
        id: 'string',
        username: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        createdTimestamp: 1,
        roles: null,
        approved: true,
        organization: null,
      })
    })

    TestBed.inject(Router)
    fixture = TestBed.createComponent(ProjectEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On the attempt to save the project when the cohort group is not defined', () => {
    beforeEach(() => {
      const mockProjectObservable = of(mockProject1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(projectService, 'create').mockImplementation(() => mockProjectObservable)
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      component.resolvedData = {
        error: null,
        project: new ProjectUiModel(mockProject1),
      }
      component.resolvedData.project.id = null
    })
    it('should call the project create method', async () => {
      await component.save()
      expect(projectService.create).toHaveBeenCalledTimes(1)
    })

    it('should not call the cohort create method', async () => {
      await component.save()
      expect(cohortService.create).not.toHaveBeenCalled()
    })
  })

  describe('On the attempt to save the project for approval', () => {
    beforeEach(() => {
      const mockProjectObservable = of({ ...mockProject1, status: ProjectStatus.Pending })
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(projectService, 'create').mockImplementation(() => mockProjectObservable)
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      jest.spyOn(cohortService, 'update').mockImplementation(() => mockCohortObservable)
      jest.spyOn(component, 'save')

      component.resolvedData = {
        error: null,
        project: new ProjectUiModel(mockProject1),
      }
      component.resolvedData.project.id = undefined
    })
    it('should set the project status to pending and call the save method if a AQL is provided', async () => {
      const aql = new AqlUiModel(mockAql3)
      component.resolvedData.project.cohortGroup.children.push(aql)
      await component.sendForApproval()
      expect(component.project.status).toEqual(ProjectStatus.Pending)
      expect(component.save).toHaveBeenCalledTimes(1)
    })

    it('should show the error message if no aql is provided', async () => {
      const toastConfig = {
        type: ToastMessageType.Error,
        message: 'PROJECT.NO_QUERY_ERROR_MESSAGE',
      }
      await component.sendForApproval()
      expect(component.project.status).not.toEqual(ProjectStatus.Pending)
      expect(component.save).not.toHaveBeenCalledTimes(1)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(toastConfig)
    })
  })

  describe('On the attempt to save the project when the cohort group is defined', () => {
    beforeEach(() => {
      const mockProjectObservable = of(mockProject1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(projectService, 'create').mockImplementation(() => mockProjectObservable)
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      component.resolvedData = {
        error: null,
        project: new ProjectUiModel(mockProject1),
      }

      const cohortGroup = new CohortGroupUiModel()
      cohortGroup.logicalOperator = LogicalOperator.And
      cohortGroup.type = ConnectorNodeType.Group
      cohortGroup.children = [new AqlUiModel(mockAql1)]
      component.resolvedData.project.cohortGroup = cohortGroup

      component.resolvedData.project.id = undefined
      component.resolvedData.project.cohortId = undefined
    })
    it('should call the project create method', async () => {
      await component.save()
      expect(projectService.create).toHaveBeenCalledTimes(1)
    })

    it('should call the cohort create method', async () => {
      await component.save()
      expect(cohortService.create).toHaveBeenCalledTimes(1)
    })
  })

  describe('On getSize of the Cohort to determine hits', () => {
    beforeEach(() => {
      const mockObservable = of(2)
      jest.spyOn(cohortService, 'getSize').mockReturnValue(mockObservable)
      jest.spyOn(component, 'updateDetermineHits')
      component.determineHitsContent.defaultMessage = 'HITS.MESSAGE_SET_ALL_PARAMETERS'

      component.resolvedData = {
        error: null,
        project: new ProjectUiModel(mockProject1),
      }
      component.resolvedData.project.id = null

      jest.clearAllMocks()
    })

    it('should call CohortService.getSize, if there is a query', async () => {
      jest
        .spyOn(component, 'getProjectForApi')
        .mockReturnValueOnce({ project: mockProject1, cohort: mockCohort1 })

      component.checkCohortValidation = function () {
        component.isCohortValid.hasAql = true
        component.isCohortValid.valid = true
      }

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('')
        expect(component.determineHitsContent.count).toBeGreaterThan(0)
      })
    })

    it('check cohort validation', async () => {
      component.checkCohortValidation(component.project.cohortGroup)
      expect(component.isCohortValid.hasAql).toEqual(false)
      expect(component.isCohortValid.valid).toEqual(true)
    })

    it('should NOT call CohortService.getSize, if there is no query, and set default message', async () => {
      jest
        .spyOn(component, 'getProjectForApi')
        .mockReturnValueOnce({ project: undefined, cohort: undefined })

      component.checkCohortValidation = function () {
        component.isCohortValid.hasAql = true
        component.isCohortValid.valid = true
      }

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(0)
        expect(component.updateDetermineHits).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual(
          'PROJECT.HITS.MESSAGE_SET_ALL_PARAMETERS'
        )
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })

    it('should fail to call the CohortService.getSize method and show Too few hits error', async () => {
      jest
        .spyOn(component, 'getProjectForApi')
        .mockReturnValueOnce({ project: mockProject1, cohort: mockCohort1 })
      jest.spyOn(cohortService, 'getSize').mockImplementationOnce(() => throwError({ status: 451 }))

      component.checkCohortValidation = function () {
        component.isCohortValid.hasAql = true
        component.isCohortValid.valid = true
      }

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual(
          'PROJECT.HITS.MESSAGE_ERROR_FEW_HITS'
        )
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })

    it('should fail to call the CohortService.getSize method and show general error', async () => {
      jest
        .spyOn(component, 'getProjectForApi')
        .mockReturnValueOnce({ project: mockProject1, cohort: mockCohort1 })
      jest.spyOn(cohortService, 'getSize').mockImplementationOnce(() => throwError('Error'))

      component.checkCohortValidation = function () {
        component.isCohortValid.hasAql = true
        component.isCohortValid.valid = true
      }

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })
  })

  describe('When the backend returns an error during project save', () => {
    beforeEach(() => {
      const mockCohortObservable = of(mockCohort1)
      jest
        .spyOn(projectService, 'create')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 400 })))
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      component.resolvedData = {
        error: null,
        project: new ProjectUiModel(mockProject1),
      }

      const cohortGroup = new CohortGroupUiModel()
      cohortGroup.logicalOperator = LogicalOperator.And
      cohortGroup.type = ConnectorNodeType.Group
      cohortGroup.children = [new AqlUiModel(mockAql1)]
      component.resolvedData.project.cohortGroup = cohortGroup

      component.resolvedData.project.id = undefined
      component.resolvedData.project.cohortId = undefined
    })

    it('should reset the status of the project to draft after failed approval request', async () => {
      expect(component.savedProjectStatus).toEqual(ProjectStatus.Draft)
      await component.sendForApproval()
      expect(component.project.status).toEqual(ProjectStatus.Draft)
    })

    it('should keep the draft status after save has hit an error', async () => {
      expect(component.savedProjectStatus).toEqual(ProjectStatus.Draft)
      await component.save()
      expect(component.project.status).toEqual(ProjectStatus.Draft)
    })
  })
})
