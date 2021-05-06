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
import { ChartsModule } from 'ng2-charts'
import { TranslateModule } from '@ngx-translate/core'
import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'

describe('BarChartComponent', () => {
  let component: BarChartComponent
  let fixture: ComponentFixture<BarChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartComponent],
      imports: [ChartsModule, TranslateModule.forRoot()],
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
      data: [1, 2, 3],
      labels: ['test1', 'test2', 'test3'],
      yLabel: 'yLabelTest',
      xLabel: 'xLabelTest',
      color: 'red',
    }
    beforeEach(() => {
      component.chartData = mockBarChart
    })

    it('should set barChartData', () => {
      expect(component.barChartData[0].data).toEqual(mockBarChart.data)
      expect(component.barChartData[0].label).toEqual(mockBarChart.yLabel)
      expect(component.barChartData[0].backgroundColor).toEqual(mockBarChart.color)
    })
  })

  describe('When new chart data arrives but is undefined', () => {
    const mockBarChart = undefined
    beforeEach(() => {
      component.chartData = mockBarChart
    })

    it('should set barChartData', () => {
      expect(component.barChartData[0].data).toHaveLength(0)
    })
  })
})
