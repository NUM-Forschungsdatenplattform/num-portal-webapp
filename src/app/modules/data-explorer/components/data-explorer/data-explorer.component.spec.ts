import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { mockStudy1 } from 'src/mocks/data-mocks/studies.mock'

import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { RouterTestingModule } from '@angular/router/testing'
import { DataExplorerComponent } from './data-explorer.component'
import { IStudyResolved } from 'src/app/modules/studies/models/study-resolved.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'

describe('DataExplorerComponent', () => {
  let component: DataExplorerComponent
  let fixture: ComponentFixture<DataExplorerComponent>
  let router: Router

  const cohortService = ({
    create: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
  } as unknown) as CohortService

  const phenotypeService = ({
    get: jest.fn().mockImplementation(() => of()),
  } as unknown) as PhenotypeService

  const adminService = ({
    getUsersByIds: jest.fn(),
  } as unknown) as AdminService

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

  @Component({ selector: 'num-result-table', template: '' })
  class ResultTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataExplorerComponent,
        StubGeneralInfoComponent,
        StubStudyEditorConnector,
        StudyEditorResearchers,
        ButtonComponent,
        StudyEditorTemplatesStubComponent,
        ResultTableStubComponent,
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
    jest.restoreAllMocks()
    jest.clearAllMocks()
    jest.spyOn(router, 'navigate').mockImplementation()
    jest.spyOn(cohortService, 'get').mockImplementation(() => of(mockCohort1))
    jest.spyOn(cohortService, 'update').mockImplementation(() => of(mockCohort1))
    jest.spyOn(adminService, 'getUsersByIds').mockImplementation(() => of(mockUsers))
  })

  describe('When the components gets initialized and the cohortId is not specified', () => {
    test.each([null, undefined])('should flag the cohorts as fetched', (cohortId) => {
      const cohortIdBackup = resolvedData.study.cohortId
      resolvedData.study.cohortId = cohortId
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(component.isCohortsFetched).toBeTruthy()
      resolvedData.study.cohortId = cohortIdBackup
    })
  })

  describe('When the components gets initialized and the researchers are not specified', () => {
    it('should flag the researchers as fetched', () => {
      resolvedData.study.researchersApi = []
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(component.isResearchersFetched).toBeTruthy()
    })
  })

  describe('When the components gets initialized and the cohortId is specified', () => {
    it('should call the cohortService to get the cohort and flag the cohort as fetched', async (done) => {
      fixture = TestBed.createComponent(DataExplorerComponent)
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
      fixture = TestBed.createComponent(DataExplorerComponent)
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

  describe('When the cancel button is clicked', () => {
    let backButton
    beforeEach(() => {
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      const nativeElement = fixture.debugElement.nativeElement
      backButton = nativeElement.querySelector('#back-button')
    })

    it('should have the back button named correct', () => {
      expect(backButton.textContent).toEqual('BUTTON.BACK')
    })

    it('should navigate back to the dashboard studies overview', () => {
      resolvedData.study.id = 1
      backButton.querySelector('button').click()
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/studies'])
    })
  })
})
