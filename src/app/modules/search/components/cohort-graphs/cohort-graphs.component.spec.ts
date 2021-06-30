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
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { SharedModule } from 'src/app/shared/shared.module'

import { CohortGraphsComponent } from './cohort-graphs.component'

describe('CohortGraphsComponent', () => {
  let component: CohortGraphsComponent
  let fixture: ComponentFixture<CohortGraphsComponent>

  const mockCohortSizeSubject$ = new Subject<number>()
  const mockPatientFilterService = ({
    cohortSizeObservable$: mockCohortSizeSubject$.asObservable(),
    getCohortSize: jest.fn(),
  } as unknown) as PatientFilterService

  @Component({
    selector: 'num-cohort-age-graph',
    template: '<div></div>',
  })
  class MockCohortAgeGraphComponent {}

  @Component({
    selector: 'num-cohort-institution-graph',
    template: '<div></div>',
  })
  class MockCohortInstitutionGraphComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CohortGraphsComponent,
        MockCohortAgeGraphComponent,
        MockCohortInstitutionGraphComponent,
      ],
      imports: [SharedModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: PatientFilterService,
          useValue: mockPatientFilterService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortGraphsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
