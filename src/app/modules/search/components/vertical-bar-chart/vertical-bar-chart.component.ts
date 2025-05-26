import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { isEmpty, map } from 'lodash-es'
import { EChartsCoreOption } from 'echarts/core'
import { FlexModule } from '@angular/flex-layout/flex'
import { NgxEchartsDirective } from 'ngx-echarts'

@Component({
  selector: 'num-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss'],
  imports: [FlexModule, NgxEchartsDirective],
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

  chartOptions: EChartsCoreOption
  updateOptions: EChartsCoreOption

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
      let updateOptions: EChartsCoreOption = {}
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
