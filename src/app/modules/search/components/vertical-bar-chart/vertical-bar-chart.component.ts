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
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { isEmpty, map } from 'lodash-es'

@Component({
  selector: 'num-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss'],
})
export class VerticalBarChartComponent implements OnChanges, OnInit {
  @Input() color: string
  @Input() set data(data: IDictionary<string, number>) {
    if (!isEmpty(data)) {
      this.handleData(data)
    }
  }
  @Input() graphName: string
  @Input() xAxisName: string

  chartOptions: EChartsOption
  updateOptions: EChartsOption

  initOptions = {
    renderer: 'svg',
    width: 400,
    height: 400,
  }

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      color: this.color,
      tooltip: {
        show: true,
      },
      xAxis: {
        axisLabel: {
          interval: 0,
          rotate: 90,
        },
        axisTick: {
          alignWithLabel: true,
        },
        type: 'category',
      },
      yAxis: {
        axisTick: {
          length: 10,
        },
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
          roundCap: true,
          type: 'bar',
          label: {
            width: 500,
            overflow: 'break',
          },
        },
      ],
    }
  }
}
