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
import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { PatientFilterComponent } from './patient-filter.component'

describe('PatientFilterComponent', () => {
  let component: PatientFilterComponent
  let fixture: ComponentFixture<PatientFilterComponent>

  const mockDataSetSubject = new Subject<number>()
  const mockPatientFilterService = ({
    getAllDatasetCount: () => of(),
    totalDatasetCountObservable: mockDataSetSubject.asObservable(),
  } as unknown) as PatientFilterService

  @Component({
    selector: 'num-patient-count-info',
  })
  class MockPatientCountInfoComponent {
    @Input() datasetCount: number
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientFilterComponent, MockPatientCountInfoComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
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
})
