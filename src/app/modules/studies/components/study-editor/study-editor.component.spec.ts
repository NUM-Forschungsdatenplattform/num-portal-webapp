import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { CohortService } from 'src/app/core/services/cohort.service'
import { StudyService } from 'src/app/core/services/study.service'
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

describe('StudyEditorComponent', () => {
  let component: StudyEditorComponent
  let fixture: ComponentFixture<StudyEditorComponent>

  const resolvedData: IStudyResolved = { study: new StudyUiModel(), error: null }
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  const studyService = ({
    create: jest.fn(),
  } as unknown) as StudyService

  const cohortService = ({
    save: jest.fn(),
  } as unknown) as CohortService

  @Component({ selector: 'num-study-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
  }
  @Component({ selector: 'num-study-editor-connector', template: '' })
  class StubStudyEditorConnector {
    @Input() cohortNode: any
  }

  @Component({ selector: 'num-study-editor-templates', template: '' })
  class StudyEditorTemplatesStubComponent {
    @Input() templates: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StudyEditorComponent,
        StubGeneralInfoComponent,
        StubStudyEditorConnector,
        ButtonComponent,
        StudyEditorTemplatesStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
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
      ],
    }).compileComponents()
  })

  beforeEach(() => {
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
