import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { CohortService } from 'src/app/core/services/cohort.service'
import { PhenotypeService } from 'src/app/core/services/phenotype.service'
import { StudyService } from 'src/app/core/services/study.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockStudy1 } from 'src/mocks/data-mocks/studies.mock'
import { IStudyResolved } from '../../study-resolved.interface'

import { StudyEditorComponent } from './study-editor.component'

describe('StudyEditorComponent', () => {
  let component: StudyEditorComponent
  let fixture: ComponentFixture<StudyEditorComponent>

  const studyService = ({
    create: jest.fn(),
  } as unknown) as StudyService

  const cohortService = ({
    save: jest.fn(),
    get: jest.fn(),
  } as unknown) as CohortService

  const adminService = ({
    getUsersByIds: jest.fn(),
  } as unknown) as AdminService

  const phenotypeService = ({
    get: jest.fn().mockImplementation(() => of()),
  } as unknown) as PhenotypeService

  const resolvedData: IStudyResolved = {
    study: new StudyUiModel(mockStudy1, phenotypeService),
    error: null,
  }
  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  @Component({ selector: 'num-study-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
  }
  @Component({ selector: 'num-study-editor-connector', template: '' })
  class StubStudyEditorConnector {
    @Input() cohortNode: any
    @Input() isLoadingComplete: boolean
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StudyEditorComponent,
        StubGeneralInfoComponent,
        StubStudyEditorConnector,
        StudyEditorResearchers,
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
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.spyOn(cohortService, 'get').mockImplementation(() => of(mockCohort1))
    jest.spyOn(adminService, 'getUsersByIds').mockImplementation(() => of(mockUsers))
  })

  describe('When the components gets initialized and the cohortId is not specified', () => {
    test.each([null, undefined])('should flag the cohorts as fetched', (cohortId) => {
      const cohortIdBackup = resolvedData.study.cohortId
      resolvedData.study.cohortId = cohortId
      fixture = TestBed.createComponent(StudyEditorComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      expect(component.isCohortsFetched).toBeTruthy()
      resolvedData.study.cohortId = cohortIdBackup
    })
  })

  describe('When the components gets initialized and the researchers are not specified', () => {
    it('should flag the researchers as fetched', () => {
      resolvedData.study.researchersApi = []
      fixture = TestBed.createComponent(StudyEditorComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      expect(component.isResearchersFetched).toBeTruthy()
    })
  })

  describe('When the components gets initialized and the cohortId is specified', () => {
    it('should call the cohortService to get the cohort and flag the cohort as fetched', async (done) => {
      fixture = TestBed.createComponent(StudyEditorComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
      component.resolvedData.study = new StudyUiModel(mockStudy1, phenotypeService)
      expect(cohortService.get).toHaveBeenLastCalledWith(mockStudy1.cohortId)

      fixture.whenStable().then(() => {
        expect(component.isCohortsFetched).toBeTruthy()
        done()
      })
    })
  })

  describe('When the components gets initialized and the researchers are specified', () => {
    it('should call the adminService to get the researchers and flag the researchers as fetched', async (done) => {
      const users = [{ userId: 'abc-1' }, { userId: 'abc-2' }]
      resolvedData.study.researchersApi = users
      fixture = TestBed.createComponent(StudyEditorComponent)
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
})