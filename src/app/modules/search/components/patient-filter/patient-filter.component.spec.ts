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
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { PatientFilterComponent } from './patient-filter.component'

describe('PatientFilterComponent', () => {
  let component: PatientFilterComponent
  let fixture: ComponentFixture<PatientFilterComponent>

  const mockDataSetSubject$ = new Subject<number>()
  const mockPatientFilterService = ({
    getAllDatasetCount: () => of(),
    totalDatasetCountObservable: mockDataSetSubject$.asObservable(),
  } as unknown) as PatientFilterService

  const mockCohortService = ({ getSize: () => of() } as unknown) as CohortService

  @Component({
    selector: 'num-patient-count-info',
    template: '<div></div>',
  })
  class PatientCountInfoComponentStub {
    @Input() patientCount: number
  }

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
        PatientCountInfoComponentStub,
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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call getAllDatasets on first load', () => {
    jest.spyOn(mockPatientFilterService, 'getAllDatasetCount')
    component.ngOnInit()
    expect(mockPatientFilterService.getAllDatasetCount).toBeCalledTimes(1)
  })

  describe('When determine hits has been clicked', () => {
    beforeEach(() => {
      component.project = new ProjectUiModel()
      jest.spyOn(mockCohortService, 'getSize').mockImplementation(() => of(123))
      fixture.detectChanges()
    })

    it('calls the api - with success', async () => {
      await component.determineCohortSize()
      expect(mockCohortService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHits.count).toEqual(123)
    })
  })
})
