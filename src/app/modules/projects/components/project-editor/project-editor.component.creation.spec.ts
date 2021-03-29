import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { IProjectResolved } from '../../models/project-resolved.interface'

import { ProjectEditorComponent } from './project-editor.component'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { RouterTestingModule } from '@angular/router/testing'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

describe('ProjectEditorComponent On Creation', () => {
  let component: ProjectEditorComponent
  let fixture: ComponentFixture<ProjectEditorComponent>
  let router: Router

  const resolvedData: IProjectResolved = { project: new ProjectUiModel(), error: null }

  const queryParamsSubject$ = new BehaviorSubject<Params>({})
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
    queryParams: queryParamsSubject$.asObservable(),
  } as unknown) as ActivatedRoute

  const projectService = ({
    create: jest.fn(),
    update: jest.fn(),
    getCommentsByProjectId: jest.fn(),
    updateStatusById: jest.fn(),
  } as unknown) as ProjectService

  const cohortService = ({
    create: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
    getSize: jest.fn(),
  } as unknown) as CohortService

  const adminService = ({
    getUsersById: jest.fn(),
  } as unknown) as AdminService

  const mockToastMessageService = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  @Component({ selector: 'num-project-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
    @Input() isDisabled: boolean
    @Input() generalInfoData: IDefinitionList[]
  }
  @Component({ selector: 'num-project-editor-connector', template: '' })
  class StubProjectEditorConnector {
    @Input() cohortNode: any
    @Input() isLoadingComplete: boolean
    @Input() isDisabled: boolean
    @Input() determineHitsContent: IDetermineHits
    @Output() determineHitsClicked = new EventEmitter()
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
        StubProjectEditorConnector,
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
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
    router = TestBed.inject(Router)
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
      const mockProjectObservable = of(mockProject1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(projectService, 'create').mockImplementation(() => mockProjectObservable)
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      jest.spyOn(component, 'save')
      component.resolvedData = {
        error: null,
        project: new ProjectUiModel(mockProject1),
      }
      component.resolvedData.project.id = undefined
    })
    it('should set the project status to pending and call the save method if a phenotype is provided', async () => {
      component.resolvedData.project.cohortGroup.children.push(new PhenotypeUiModel())
      await component.sendForApproval()
      expect(component.project.status).toEqual(ProjectStatus.Pending)
      expect(component.save).toHaveBeenCalledTimes(1)
    })

    it('should show the error message if no phenotype is provided', async () => {
      const toastConfig = {
        type: ToastMessageType.Error,
        message: 'PROJECT.NO_PHENOTYPE_ERROR_MESSAGE',
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
      cohortGroup.children = [new PhenotypeUiModel()]
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

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('')
        expect(component.determineHitsContent.count).toBeGreaterThan(0)
      })
    })

    it('should NOT call CohortService.getSize, if there is no query, and set default message', async () => {
      jest
        .spyOn(component, 'getProjectForApi')
        .mockReturnValueOnce({ project: undefined, cohort: undefined })

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

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })
  })
})
