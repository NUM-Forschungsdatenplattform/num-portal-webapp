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
import { LayoutModule } from '@angular/cdk/layout'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject, throwError } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { SharedModule } from 'src/app/shared/shared.module'
import { mockAqlCohort } from 'src/mocks/data-mocks/aqls.mock'
import { mockCohortPreviewData } from 'src/mocks/data-mocks/cohort-graph.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import {
  mockManagerUserProfile,
  mockProjectLeadProfile,
} from 'src/mocks/data-mocks/user-profile.mock'
import { PatientCountInfoComponent } from '../patient-count-info/patient-count-info.component'
import { PatientCountInfoHarness } from '../patient-count-info/testing/patient-count-info.harness'
import { PatientFilterComponent } from './patient-filter.component'

describe('PatientFilterComponent', () => {
  let component: PatientFilterComponent
  let fixture: ComponentFixture<PatientFilterComponent>
  let loader: HarnessLoader

  const mockDataSetSubject$ = new Subject<number>()
  const mockPreviewDataSubject$ = new Subject<string>()
  const mockPatientFilterService = {
    getAllDatasetCount: jest.fn(),
    getPreviewData: jest.fn(),
    getCurrentProject: jest.fn(),
    setCurrentProject: jest.fn(),
    previewDataObservable$: mockPreviewDataSubject$.asObservable(),
    totalDatasetCountObservable: mockDataSetSubject$.asObservable(),
    resetPreviewData: jest.fn(),
  } as unknown as PatientFilterService

  const mockRouter = {
    navigate: jest.fn(),
  } as unknown as Router

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const mockCohortService = {
    getSize: jest.fn(),
  } as unknown as CohortService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const mockProfileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown as ProfileService

  const filteredAqlsSubject$ = new Subject<IAqlApi[]>()
  const filterConfigSubject$ = new BehaviorSubject<IAqlFilter>({ searchText: '', filterItem: [] })

  const mockAqlService = {
    setFilter: jest.fn(),
    filteredAqlsObservable$: filteredAqlsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
  } as unknown as AqlService

  @Component({
    selector: 'num-cohort-builder',
    template: '<div></div>',
  })
  class CohortBuilderComponentStub {
    @Input() cohortNode: CohortGroupUiModel
    @Input() isLoadingComplete: boolean
    @Input() raised: boolean
  }

  @Component({
    selector: 'num-cohort-graphs',
    template: '<div></div>',
  })
  class CohortGraphsComponentStub {
    @Input() previewData: string
    @Input() determineHits: IDetermineHits
    @Output() determine = new EventEmitter<void>()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CohortBuilderComponentStub,
        CohortGraphsComponentStub,
        PatientCountInfoComponent,
        PatientFilterComponent,
        SearchComponent,
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LayoutModule,
        SharedModule,
        TranslateModule.forRoot(),
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
          provide: ProfileService,
          useValue: mockProfileService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: AqlService,
          useValue: mockAqlService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockAqlService, 'setFilter')
    jest.spyOn(mockPatientFilterService, 'getAllDatasetCount').mockImplementation(() => of(123))
    jest
      .spyOn(mockPatientFilterService, 'getCurrentProject')
      .mockImplementation(() => of(new ProjectUiModel()))
    jest.clearAllMocks()
    fixture = TestBed.createComponent(PatientFilterComponent)
    component = fixture.componentInstance
    component.checkCohortValidation = function () {
      component.isCohortValid.hasAql = true
      component.isCohortValid.valid = true
    }
    loader = TestbedHarnessEnvironment.loader(fixture)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Patient data set count', () => {
    let patientCountInfo: PatientCountInfoHarness
    beforeEach(async () => {
      patientCountInfo = await loader.getHarness(PatientCountInfoHarness)
    })

    it('should call getAllDatasets on first load', () => {
      expect(mockPatientFilterService.getAllDatasetCount).toHaveBeenCalledTimes(1)
    })

    it('should provide the dataset count to patient info component', async () => {
      expect(await patientCountInfo.getCountText()).toEqual('SEARCH.PATIENT_COUNT_INFO')
    })
  })

  describe('When determine hits has been clicked as a manager', () => {
    let cohort: CohortGroupUiModel
    let project: ProjectUiModel
    beforeEach(() => {
      project = new ProjectUiModel()
      cohort = new CohortGroupUiModel()
      cohort.children.push(
        new AqlUiModel(mockAqlCohort, false, {
          $bodyHeight: 'testHeight',
          $bodyWeight: 'testWeight',
        })
      )
      project.cohortGroup = cohort
      component.project = project

      userProfileSubject$.next(mockManagerUserProfile)
      fixture.detectChanges()
    })

    it('should set loading status if no cohortNode has been provided', async () => {
      component.project.cohortGroup = undefined
      await component.getPreviewData()
      expect(component.determineHits.isLoading).toBe(false)
    })

    it('gets the cohort size from from cohort service', async () => {
      jest
        .spyOn(mockPatientFilterService, 'getPreviewData')
        .mockImplementation(() => of(mockCohortPreviewData))
      jest.spyOn(mockCohortService, 'getSize').mockImplementation(() => of(528))
      await component.getPreviewData()
      expect(mockPatientFilterService.getPreviewData).toHaveBeenCalledTimes(1)
      expect(mockCohortService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHits.count).toEqual(528)
    })

    it('should show an error for to few hits', async () => {
      jest
        .spyOn(mockPatientFilterService, 'getPreviewData')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 451 })))

      jest
        .spyOn(mockCohortService, 'getSize')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 451 })))

      await component.getPreviewData()
      expect(component.determineHits.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_FEW_HITS')
    })

    it('should show a general error message for unknown errors', async () => {
      jest
        .spyOn(mockPatientFilterService, 'getPreviewData')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 500 })))

      jest
        .spyOn(mockCohortService, 'getSize')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 500 })))
      await component.getPreviewData()
      expect(component.determineHits.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
    })

    it('should call the service to get preview data from api', async () => {
      jest
        .spyOn(mockPatientFilterService, 'getPreviewData')
        .mockImplementation(() => of(mockCohortPreviewData))

      await component.getPreviewData()
      const cohortGroupApi = component.cohortNode.convertToApi()
      expect(mockPatientFilterService.getPreviewData).toHaveBeenCalledWith(cohortGroupApi, false)
    })

    it('should reset the preview data on too few hits', async () => {
      jest.spyOn(mockPatientFilterService, 'resetPreviewData')
      jest
        .spyOn(mockPatientFilterService, 'getPreviewData')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 451 })))

      await component.getPreviewData()
      expect(mockPatientFilterService.resetPreviewData).toHaveBeenCalledTimes(1)
    })
  })

  describe('When determine hitshas been clicked as a project lead', () => {
    let cohort: CohortGroupUiModel
    let project: ProjectUiModel
    beforeEach(() => {
      project = new ProjectUiModel()
      cohort = new CohortGroupUiModel()
      cohort.children.push(
        new AqlUiModel(mockAqlCohort, false, {
          $bodyHeight: 'testHeight',
          $bodyWeight: 'testWeight',
        })
      )
      project.cohortGroup = cohort
      component.project = project

      userProfileSubject$.next(mockProjectLeadProfile)
      fixture.detectChanges()
    })

    it('should set loading status to false if no cohortNode has been provided', async () => {
      component.project.cohortGroup = undefined
      await component.getPreviewData()
      expect(component.determineHits.isLoading).toBe(false)
    })

    it('gets the cohort size from cohort service', async () => {
      jest.spyOn(mockCohortService, 'getSize').mockImplementation(() => of(528))
      await component.getPreviewData()
      const cohortGroupApi = component.cohortNode.convertToApi()
      expect(mockCohortService.getSize).toHaveBeenCalledWith(cohortGroupApi, false)
      expect(mockCohortService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHits.count).toEqual(528)
    })

    it('xxxx', async () => {
      component.checkCohortValidation(component.project.cohortGroup)
    })

    it('should show an error for to few hits', async () => {
      jest
        .spyOn(mockCohortService, 'getSize')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 451 })))

      component.checkCohortValidation = function () {
        component.isCohortValid.hasAql = true
        component.isCohortValid.valid = true
      }

      await component.getPreviewData()
      expect(component.determineHits.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_FEW_HITS')
    })

    it('should show a general error message for unknown errors', async () => {
      jest
        .spyOn(mockCohortService, 'getSize')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 500 })))
      await component.getPreviewData()
      expect(component.determineHits.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
    })

    it('should reset the preview data on too few hits', async () => {
      jest.spyOn(mockPatientFilterService, 'resetPreviewData')
      jest
        .spyOn(mockCohortService, 'getSize')
        .mockImplementation(() => throwError(new HttpErrorResponse({ status: 451 })))

      await component.getPreviewData()
      expect(mockPatientFilterService.resetPreviewData).toHaveBeenCalledTimes(1)
    })

    it('should not call the getSize method from patient-filter service', async () => {
      jest.spyOn(mockCohortService, 'getSize').mockImplementation(() => of(789))
      jest.spyOn(mockPatientFilterService, 'getPreviewData')

      await component.getPreviewData()

      expect(mockCohortService.getSize).toHaveBeenCalled()
      expect(mockPatientFilterService.getPreviewData).not.toHaveBeenCalled()
    })
  })

  describe('When the user wants to navigate to the data filter page and the cohort is defined', () => {
    beforeEach(() => {
      component.project.addCohortGroup(mockCohort1.cohortGroup)
      component.goToDataFilter()
    })
    it('should set the current project', () => {
      expect(mockPatientFilterService.setCurrentProject).toHaveBeenCalledWith(component.project)
    })

    it('should navigate to the patient data retrieval page', () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['search/data-filter'], {})
    })
  })

  describe('When the user wants to navigate to the data filter page and the cohort is not defined', () => {
    beforeEach(() => {
      component.goToDataFilter()
    })
    it('should show the error message', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Error,
        message: 'PROJECT.NO_QUERY_ERROR_MESSAGE',
      })
    })
  })

  describe('When the user wants to filter and search aqls', () => {
    it('should set the filter in the aqlService on searchChange', () => {
      component.handleSearchChange()
      expect(mockAqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
    })

    it('should set the filter in the aqlService on filterChange', () => {
      component.handleFilterChange()
      expect(mockAqlService.setFilter).toHaveBeenCalledWith(component.filterConfig)
    })
  })
})
