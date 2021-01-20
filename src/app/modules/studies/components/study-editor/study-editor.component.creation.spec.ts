import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
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
import { IStudyResolved } from '../../study-resolved.interface'

import { StudyEditorComponent } from './study-editor.component'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { RouterTestingModule } from '@angular/router/testing'

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
  } as unknown) as StudyService

  const cohortService = ({
    save: jest.fn(),
    get: jest.fn(),
  } as unknown) as CohortService

  const adminService = ({
    getUsersById: jest.fn(),
  } as unknown) as AdminService

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
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
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
      ],
    }).compileComponents()
  })

  beforeEach(() => {
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
      jest.spyOn(cohortService, 'save').mockImplementation(() => mockCohortObservable)
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

    it('should not call the cohort save method', async () => {
      await component.save()
      expect(cohortService.save).not.toHaveBeenCalled()
    })
  })

  describe('On the attempt to save the study for approval', () => {
    beforeEach(() => {
      const mockStudyObservable = of(mockStudy1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(studyService, 'create').mockImplementation(() => mockStudyObservable)
      jest.spyOn(cohortService, 'save').mockImplementation(() => mockCohortObservable)
      jest.spyOn(component, 'save')
      component.resolvedData = {
        error: null,
        study: new StudyUiModel(mockStudy1),
      }
      component.resolvedData.study.id = undefined
    })
    it('should set the study status to pending and call the save save method', async () => {
      await component.sendForApproval()
      expect(component.study.status).toEqual(StudyStatus.Pending)
      expect(component.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('On the attempt to save the study when the cohort group is defined', () => {
    beforeEach(() => {
      const mockStudyObservable = of(mockStudy1)
      const mockCohortObservable = of(mockCohort1)
      jest.spyOn(studyService, 'create').mockImplementation(() => mockStudyObservable)
      jest.spyOn(cohortService, 'save').mockImplementation(() => mockCohortObservable)
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

    it('should call the cohort save method', async () => {
      await component.save()
      expect(cohortService.save).toHaveBeenCalledTimes(1)
    })
  })
})
