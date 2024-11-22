import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { DataFilterComponent } from './data-filter.component'
import { AuthService } from 'src/app/core/auth/auth.service'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { FeatureService } from '../../../../core/services/feature/feature.service'
import { HttpClient, HttpHandler } from '@angular/common/http'

describe('DataFilterComponent', () => {
  let component: DataFilterComponent
  let fixture: ComponentFixture<DataFilterComponent>

  @Component({ selector: 'num-data-filter-templates', template: '' })
  class StubDataFilterTemplatesComponent {
    @Input() project: ProjectUiModel
    @Input() isHitCounterLoading: boolean
    @Input() hitCounter: IDictionary<string, number>
    @Input() totalCohortSize: number
    @Output() determineHits = new EventEmitter()
  }

  const mockPatientFilterService = {
    setCurrentProject: jest.fn(),
  } as unknown as PatientFilterService

  const mockCohortService = {
    getSize: jest.fn(),
    getSizeForTemplates: jest.fn(),
  } as unknown as CohortService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const mockRouter = {
    navigate: jest.fn(),
  } as unknown as Router

  const resolvedData: ProjectUiModel = new ProjectUiModel(mockProject1)
  resolvedData.addCohortGroup(mockCohort1.cohortGroup)
  const mockActivatedRoute = {
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown as ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFilterComponent, ButtonComponent, StubDataFilterTemplatesComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        DirectivesModule,
      ],
      providers: [
        {
          provide: PatientFilterService,
          useValue: mockPatientFilterService,
        },
        {
          provide: CohortService,
          useValue: mockCohortService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        FeatureService,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockCohortService, 'getSize').mockImplementation(() => of(123))
    jest.clearAllMocks()
    fixture = TestBed.createComponent(DataFilterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On init', () => {
    it('should get the size of the current cohort', () => {
      const { cohortGroup } = resolvedData.convertToApiInterface()
      expect(mockCohortService.getSize).toHaveBeenCalledWith(cohortGroup, false)
    })
  })

  describe('When the user wants to navigate to the patient filter', () => {
    beforeEach(() => {
      component.goToPatientFilter()
    })
    it('should set the current project', () => {
      expect(mockPatientFilterService.setCurrentProject).toHaveBeenCalledWith(resolvedData)
    })

    it('should navigate to the patient filter page', () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['search'], {})
    })
  })

  describe('When the user wants to navigate to the data retrieval', () => {
    beforeEach(() => {
      component.gotToDataRetrival()
    })
    it('should set the current project', () => {
      expect(mockPatientFilterService.setCurrentProject).toHaveBeenCalledWith(resolvedData)
    })

    it('should navigate to the patient data retrieval page', () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['search/data-explorer'], {})
    })
  })

  describe('When the user wants to navigate to the project editor', () => {
    beforeEach(() => {
      component.gotToProject()
    })

    it('should navigate to the project editor page with the current project', () => {
      const project = resolvedData.convertToApiInterface()
      expect(mockRouter.navigate).toHaveBeenCalledWith(['projects/new/editor'], {
        state: { project },
      })
    })
  })
})
