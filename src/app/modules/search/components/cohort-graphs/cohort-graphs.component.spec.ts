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
import { MatDividerModule } from '@angular/material/divider'
import { TranslateModule } from '@ngx-translate/core'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { SharedModule } from 'src/app/shared/shared.module'
import { mockCohortPreviewData } from 'src/mocks/data-mocks/cohort-graph.mock'

import { CohortGraphsComponent } from './cohort-graphs.component'

describe('CohortGraphsComponent', () => {
  let component: CohortGraphsComponent
  let fixture: ComponentFixture<CohortGraphsComponent>

  @Component({
    selector: 'num-vertical-bar-chart',
    template: '<div></div>',
  })
  class VerticalBarChartComponentStub {
    @Input() color: string
    @Input() data: IDictionary<number, number>
    @Input() graphName: string
    @Input() xAxisName: string
    @Input() yAxisName: string
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CohortGraphsComponent, VerticalBarChartComponentStub],
      imports: [MatDividerModule, SharedModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortGraphsComponent)
    component = fixture.componentInstance
    component.previewData = mockCohortPreviewData
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
