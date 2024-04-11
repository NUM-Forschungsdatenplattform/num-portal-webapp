import { Component, Input } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'

@Component({
  selector: 'num-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent {
  private chart: IBarChart
  @Input() set chartData(chart: IBarChart) {
    if (chart) {
      this.chart = chart
      this.handleData()
    }
  }
  get chartData(): IBarChart {
    return this.chart
  }

  constructor(private translateService: TranslateService) {}

  showXAxis = true
  showYAxis = true
  gradient = false
  showLegend = false
  showXAxisLabel = true
  xAxisLabel: string
  showYAxisLabel = true
  yAxisLabel: string
  roundEdges = false
  colorScheme = {
    domain: [],
  }

  results: any[] = []

  handleData(): void {
    this.xAxisLabel = this.translateService.instant(this.chart.xLabel)
    this.yAxisLabel = this.translateService.instant(this.chart.yLabel)
    this.colorScheme.domain = [this.chart.color]
    this.results = this.chart.data
  }
}
