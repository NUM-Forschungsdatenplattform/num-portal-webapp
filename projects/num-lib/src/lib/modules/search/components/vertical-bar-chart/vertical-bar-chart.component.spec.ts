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
import { SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { BarSeriesOption, XAXisComponentOption } from 'echarts'
import { NgxEchartsModule } from 'ngx-echarts'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { mockAgeGraphData } from 'src/mocks/data-mocks/cohort-graph.mock'
import { VerticalBarChartComponent } from './vertical-bar-chart.component'

describe('VerticalBarChartComponent', () => {
  let component: VerticalBarChartComponent
  let fixture: ComponentFixture<VerticalBarChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalBarChartComponent],
      imports: [
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalBarChartComponent)
    component = fixture.componentInstance
    component.data = mockAgeGraphData
    component.xAxisName = 'X-Axis'
    component.graphName = 'Test-Graph'
    component.color = '#333333'
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should update the axis labels if translation changes', () => {
    component.ngOnChanges({ xAxisName: new SimpleChange('X-Axis', 'X-Achse', false) })
    expect((component.updateOptions.xAxis as XAXisComponentOption).name).toEqual('X-Achse')
  })

  it('should update the data for the graph on change', () => {
    const newGraphData: IDictionary<string, number> = {
      '0-9': 3,
      '10-19': 15,
      '20-29': 56,
      '30-39': 62,
    }
    component.ngOnChanges({ data: new SimpleChange(mockAgeGraphData, newGraphData, false) })
    expect((component.updateOptions.series[0] as BarSeriesOption).data).toEqual([3, 15, 56, 62])
  })

  it('should not change graph data on unknown changes', () => {
    const beforeUpdate = { ...component.updateOptions }
    component.ngOnChanges({ test: new SimpleChange('test 1', 'test 2', true) })
    expect(component.updateOptions).toEqual(beforeUpdate)
  })

  it('should not change graph data on emtpy data set', () => {
    const beforeUpdate = { ...component.updateOptions }
    component.data = {}
    expect(component.updateOptions).toEqual(beforeUpdate)
  })
})
