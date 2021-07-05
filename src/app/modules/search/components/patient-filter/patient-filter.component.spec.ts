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
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { PatientCountInfoComponent } from '../patient-count-info/patient-count-info.component'
import { PatientCountInfoHarness } from '../patient-count-info/testing/patient-count-info.harness'
import { PatientFilterComponent } from './patient-filter.component'

describe('PatientFilterComponent', () => {
  let component: PatientFilterComponent
  let fixture: ComponentFixture<PatientFilterComponent>
  let loader: HarnessLoader

  const mockDataSetSubject$ = new Subject<number>()
  const mockPatientFilterService = ({
    getAllDatasetCount: () => of(),
    totalDatasetCountObservable: mockDataSetSubject$.asObservable(),
  } as unknown) as PatientFilterService

  const mockCohortService = ({
    getSize: () => of(),
    handleError: (error) => throwError(error),
  } as unknown) as CohortService
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
      ],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: CohortService,
          useValue: mockCohortService,
        },
        {
          provide: PatientFilterService,
          useValue: mockPatientFilterService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFilterComponent)
    component = fixture.componentInstance
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

    it('should call getAllDatasets on first load', async () => {
      jest.spyOn(mockPatientFilterService, 'getAllDatasetCount')
      component.ngOnInit()
      expect(mockPatientFilterService.getAllDatasetCount).toBeCalledTimes(1)
    })

    it('should provide the dataset count to patient info component', async () => {
      expect(await patientCountInfo.getCountText()).toEqual('SEARCH.PATIENT_COUNT_INFO')
    })
  })

  describe('When determine hits has been clicked', () => {
    beforeEach(() => {
      component.project = new ProjectUiModel()
      fixture.detectChanges()
    })

    it('should set loading status if no cohortNode has been provided', async () => {
      component.project.cohortGroup = undefined
      await component.determineCohortSize()
      expect(component.determineHits.isLoading).toBe(true)
    })

    it('calls the api - with success', async () => {
      jest.spyOn(mockCohortService, 'getSize').mockImplementation(() => of(123))
      await component.determineCohortSize()
      expect(mockCohortService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHits.count).toEqual(123)
    })
  })

  it('should show an error for to few hits', async () => {
    jest
      .spyOn(mockCohortService, 'getSize')
      .mockImplementation(() => throwError(new HttpErrorResponse({ status: 451 })))

    await component.determineCohortSize()
    expect(component.determineHits.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_FEW_HITS')
  })

  it('should show a general error message for unknown errors', async () => {
    jest
      .spyOn(mockCohortService, 'getSize')
      .mockImplementation(() => throwError(new HttpErrorResponse({ status: 500 })))
    await component.determineCohortSize()
    expect(component.determineHits.message).toEqual('PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
  })
})
