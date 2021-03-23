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
import { StudyService } from 'src/app/core/services/study/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockStudy1 } from 'src/mocks/data-mocks/studies.mock'
import { IStudyResolved } from '../../models/study-resolved.interface'

import { StudyEditorComponent } from './study-editor.component'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { RouterTestingModule } from '@angular/router/testing'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'

describe('StudyEditorComponent On Creation', () => {
  let component: StudyEditorComponent
  let fixture: ComponentFixture<StudyEditorComponent>
  let router: Router

  const resolvedData: IStudyResolved = { study: new StudyUiModel(), error: null }

  const queryParamsSubject$ = new BehaviorSubject<Params>({})
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
    queryParams: queryParamsSubject$.asObservable(),
  } as unknown) as ActivatedRoute

  const studyService = ({
    create: jest.fn(),
    update: jest.fn(),
    getCommentsByStudyId: jest.fn(),
    updateStatusById: jest.fn(),
  } as unknown) as StudyService

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

  @Component({ selector: 'num-study-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
    @Input() isDisabled: boolean
    @Input() generalInfoData: IDefinitionList[]
  }
  @Component({ selector: 'num-study-editor-connector', template: '' })
  class StubStudyEditorConnector {
    @Input() cohortNode: any
    @Input() isLoadingComplete: boolean
    @Input() isDisabled: boolean
    @Input() determineHitsContent: IDetermineHits
    @Output() determineHitsClicked = new EventEmitter()
  }
  @Component({ selector: 'num-study-editor-researchers', template: '' })
  class StudyEditorResearchers {
    @Input() researchers: any[]
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
  }

  @Component({ selector: 'num-study-editor-templates', template: '' })
  class StudyEditorTemplatesStubComponent {
    @Input() templates: any
    @Input() isDisabled: boolean
  }

  const postCommentEmitter = new EventEmitter()
  @Component({ selector: 'num-study-editor-comments', template: '' })
  class StudyEditorCommentsStubComponent {
    @Input() isLoadingComplete: any
    @Input() comments: any[]
    @Input() form: any
    @Output() postComment = postCommentEmitter
  }

  @Component({ selector: 'num-study-editor-approval', template: '' })
  class StudyEditorApprovalStubComponent {
    @Input() form: any
  }

  const saveAllEmitter = new EventEmitter()
  const saveResearchersEmitter = new EventEmitter()
  const saveAsApprovalRequestEmitter = new EventEmitter()
  const saveAsApprovalReplyEmitter = new EventEmitter()
  const startEditEmitter = new EventEmitter()
  const cancelEmitter = new EventEmitter()
  @Component({ selector: 'num-study-editor-buttons', template: '' })
  class StudyEditorButtonsStubComponent {
    @Input() editorMode: any
    @Input() studyStatus: any
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
        StudyEditorComponent,
        StubGeneralInfoComponent,
        StubStudyEditorConnector,
        StudyEditorResearchers,
        ButtonComponent,
        StudyEditorTemplatesStubComponent,
        StudyEditorButtonsStubComponent,
        StudyEditorCommentsStubComponent,
        StudyEditorApprovalStubComponent,
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
          provide: StudyService,
          useValue: studyService,
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
    fixture = TestBed.createComponent(StudyEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On the attempt to save the study when the cohort group is not defined', () => {
    beforeEach(() => {
      const mockStudyObservable = of(mockStudy1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(studyService, 'create').mockImplementation(() => mockStudyObservable)
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      component.resolvedData = {
        error: null,
        study: new StudyUiModel(mockStudy1),
      }
      component.resolvedData.study.id = null
    })
    it('should call the study create method', async () => {
      await component.save()
      expect(studyService.create).toHaveBeenCalledTimes(1)
    })

    it('should not call the cohort create method', async () => {
      await component.save()
      expect(cohortService.create).not.toHaveBeenCalled()
    })
  })

  describe('On the attempt to save the study for approval', () => {
    beforeEach(() => {
      const mockStudyObservable = of(mockStudy1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(studyService, 'create').mockImplementation(() => mockStudyObservable)
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      jest.spyOn(component, 'save')
      component.resolvedData = {
        error: null,
        study: new StudyUiModel(mockStudy1),
      }
      component.resolvedData.study.id = undefined
    })
    it('should set the study status to pending and call the save method if a phenotype is provided', async () => {
      component.resolvedData.study.cohortGroup.children.push(new PhenotypeUiModel())
      await component.sendForApproval()
      expect(component.study.status).toEqual(StudyStatus.Pending)
      expect(component.save).toHaveBeenCalledTimes(1)
    })

    it('should show the error message if no phenotype is provided', async () => {
      const toastConfig = {
        type: ToastMessageType.Error,
        message: 'STUDY.NO_PHENOTYPE_ERROR_MESSAGE',
      }
      await component.sendForApproval()
      expect(component.study.status).not.toEqual(StudyStatus.Pending)
      expect(component.save).not.toHaveBeenCalledTimes(1)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(toastConfig)
    })
  })

  describe('On the attempt to save the study when the cohort group is defined', () => {
    beforeEach(() => {
      const mockStudyObservable = of(mockStudy1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(studyService, 'create').mockImplementation(() => mockStudyObservable)
      jest.spyOn(cohortService, 'create').mockImplementation(() => mockCohortObservable)
      component.resolvedData = {
        error: null,
        study: new StudyUiModel(mockStudy1),
      }

      const cohortGroup = new CohortGroupUiModel()
      cohortGroup.logicalOperator = LogicalOperator.And
      cohortGroup.type = ConnectorNodeType.Group
      cohortGroup.children = [new PhenotypeUiModel()]
      component.resolvedData.study.cohortGroup = cohortGroup

      component.resolvedData.study.id = undefined
      component.resolvedData.study.cohortId = undefined
    })
    it('should call the study create method', async () => {
      await component.save()
      expect(studyService.create).toHaveBeenCalledTimes(1)
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
        study: new StudyUiModel(mockStudy1),
      }
      component.resolvedData.study.id = null

      jest.clearAllMocks()
    })

    it('should call CohortService.getSize, if there is a query', async () => {
      jest
        .spyOn(component, 'getStudyForApi')
        .mockReturnValueOnce({ study: mockStudy1, cohort: mockCohort1 })

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('')
        expect(component.determineHitsContent.count).toBeGreaterThan(0)
      })
    })

    it('should NOT call CohortService.getSize, if there is no query, and set default message', async () => {
      jest
        .spyOn(component, 'getStudyForApi')
        .mockReturnValueOnce({ study: undefined, cohort: undefined })

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(0)
        expect(component.updateDetermineHits).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual(
          'STUDY.HITS.MESSAGE_SET_ALL_PARAMETERS'
        )
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })

    it('should fail to call the CohortService.getSize method and show Too few hits error', async () => {
      jest
        .spyOn(component, 'getStudyForApi')
        .mockReturnValueOnce({ study: mockStudy1, cohort: mockCohort1 })
      jest.spyOn(cohortService, 'getSize').mockImplementationOnce(() => throwError({ status: 451 }))

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('STUDY.HITS.MESSAGE_ERROR_FEW_HITS')
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })

    it('should fail to call the CohortService.getSize method and show general error', async () => {
      jest
        .spyOn(component, 'getStudyForApi')
        .mockReturnValueOnce({ study: mockStudy1, cohort: mockCohort1 })
      jest.spyOn(cohortService, 'getSize').mockImplementationOnce(() => throwError('Error'))

      await component.determineHits().then(() => {
        expect(cohortService.getSize).toHaveBeenCalledTimes(1)
        expect(component.determineHitsContent.message).toEqual('STUDY.HITS.MESSAGE_ERROR_MESSAGE')
        expect(component.determineHitsContent.count).toEqual(null)
      })
    })
  })
})
