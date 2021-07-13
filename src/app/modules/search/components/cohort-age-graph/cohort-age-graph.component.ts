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
import { Component, Input, OnInit } from '@angular/core'
import { map } from 'lodash-es'
import { IBarChartData } from 'src/app/shared/models/charts/bar-chart-data.interface'
import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { mockAgeGraphData } from 'src/mocks/data-mocks/cohort-graph.mock'

@Component({
  selector: 'num-cohort-age-graph',
  templateUrl: './cohort-age-graph.component.html',
  styleUrls: ['./cohort-age-graph.component.scss'],
})
export class CohortAgeGraphComponent implements OnInit {
  @Input() set data(data: IDictionary<number, number>) {
    if (data) {
      this.handleData(data)
    } else {
      this.handleData(mockAgeGraphData)
    }
  }

  chartData: IBarChart

  showXAxis = true
  showXAxisLabel = true
  showYAxis = true
  showYAxisLabel = true
  view = [500, 500]

  constructor() {}

  ngOnInit(): void {}

  private handleData(data: IDictionary<number, number>): void {
    this.chartData = {
      color: '#333333',
      data: map(
        data,
        (value, key): IBarChartData => {
          return { name: key, value }
        }
      ),
      xLabel: 'CHARTS.COHORT_AGE.XLABEL',
      yLabel: 'CHARTS.COHORT_AGE.YLABEL',
    }
  }
}
