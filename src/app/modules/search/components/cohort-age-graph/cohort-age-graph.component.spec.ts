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
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { mockAgeGraphData } from 'src/mocks/data-mocks/cohort-graph.mock'
import { CohortAgeGraphComponent } from './cohort-age-graph.component'

describe('CohortAgeGraphComponent', () => {
  let component: CohortAgeGraphComponent
  let fixture: ComponentFixture<CohortAgeGraphComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CohortAgeGraphComponent],
      imports: [NoopAnimationsModule, NgxChartsModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortAgeGraphComponent)
    component = fixture.componentInstance
    component.data = mockAgeGraphData
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
