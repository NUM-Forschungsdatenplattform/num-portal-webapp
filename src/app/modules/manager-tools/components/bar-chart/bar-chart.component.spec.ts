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
import { BarChartComponent } from './bar-chart.component'
import { TranslateModule } from '@ngx-translate/core'
import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('BarChartComponent', () => {
  let component: BarChartComponent
  let fixture: ComponentFixture<BarChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartComponent],
      imports: [TranslateModule.forRoot(), BrowserAnimationsModule, NgxChartsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When new chart data arrives', () => {
    const mockBarChart: IBarChart = {
      data: [
        {
          name: 'test1',
          value: 1,
        },
        {
          name: 'test2',
          value: 2,
        },
        {
          name: 'test3',
          value: 3,
        },
      ],
      yLabel: 'yLabelTest',
      xLabel: 'xLabelTest',
      color: 'red',
    }
    beforeEach(() => {
      component.chartData = mockBarChart
    })

    it('should set barChartData', () => {
      expect(component.results).toEqual(mockBarChart.data)
      expect(component.yAxisLabel).toEqual(mockBarChart.yLabel)
      expect(component.colorScheme.domain[0]).toEqual(mockBarChart.color)
    })
  })

  describe('When new chart data arrives but is undefined', () => {
    const mockBarChart = undefined
    beforeEach(() => {
      component.chartData = mockBarChart
    })

    it('should set barChartData', () => {
      expect(component.results).toHaveLength(0)
    })
  })
})
