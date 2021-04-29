import { Component, Input, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'
import { Label } from 'ng2-charts'
import { IBarChart } from 'src/app/shared/models/charts/chart.interface'

@Component({
  selector: 'num-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  private chart: IBarChart
  @Input() set chartData(chart: IBarChart) {
    this.chart = chart
    this.handleData()
  }
  get chartData(): IBarChart {
    return this.chart
  }

  constructor(private translateService: TranslateService) {}

  barChartOptions: ChartOptions = {}
  barChartData: ChartDataSets[] = [
    {
      data: [],
    },
  ]
  barChartLabels: Label[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = false
  barChartColors: any

  ngOnInit(): void {}

  handleData(): void {
    this.barChartData = [
      {
        data: this.chart.data,
        label: this.translateService.instant(this.chart.yLabel),
        backgroundColor: this.chart.color,
        hoverBackgroundColor: this.chart.color + '80',
      },
    ]
    this.barChartLabels = this.chart.labels

    this.barChartOptions = {
      responsive: true,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.translateService.instant(this.chart.xLabel),
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.translateService.instant(this.chart.yLabel),
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
  }
}
