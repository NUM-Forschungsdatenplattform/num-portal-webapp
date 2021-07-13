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
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { EChartsOption } from 'echarts'
import { isEmpty, map } from 'lodash-es'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'

@Component({
  selector: 'num-cohort-age-graph',
  templateUrl: './cohort-age-graph.component.html',
  styleUrls: ['./cohort-age-graph.component.scss'],
})
export class CohortAgeGraphComponent implements OnInit, OnChanges {
  @Input() set data(data: IDictionary<number, number>) {
    if (!isEmpty(data)) {
      this.handleData(data)
    }
  }

  @Input() xAxisName: string
  @Input() yAxisName: string

  chartOptions: EChartsOption
  updateOptions: EChartsOption

  initOptions = {
    remderer: 'svg',
    width: 500,
    height: 400,
  }

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      color: '#5F0D22',
      series: [
        {
          type: 'bar',
          data: map(this.data, (value) => value),
        },
      ],
      tooltip: {
        show: true,
      },
      xAxis: {
        axisTick: {
          show: false,
        },
        data: map(this.data, (_, key) => key),
        name: this.xAxisName,
        nameLocation: 'start',
        type: 'category',
      },
      yAxis: {
        axisTick: {
          length: 10,
        },
        name: this.yAxisName,
        nameLocation: 'end',
        type: 'value',
      },
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !!changes.data &&
      !isEmpty(changes.data.currentValue) &&
      (changes.data.isFirstChange() || changes.data.previousValue !== changes.data.currentValue)
    ) {
      this.handleData(changes.data.currentValue)
    } else if (changes.xAxisName || changes.yAxisName) {
      let updateOptions: EChartsOption = {}
      if (changes.xAxisName) {
        updateOptions = {
          ...updateOptions,
          xAxis: {
            name: changes.xAxisName.currentValue,
          },
        }
      }

      if (changes.yAxisName) {
        updateOptions = {
          ...updateOptions,
          yAxis: {
            name: changes.yAxisName.currentValue,
          },
        }
      }

      this.updateOptions = updateOptions
    }
  }

  private handleData(data: IDictionary<number, number>): void {
    this.updateOptions = {
      xAxis: {
        data: map(data, (_, key) => key),
      },
      series: [
        {
          data: map(data, (d) => d),
        },
      ],
    }
  }
}
