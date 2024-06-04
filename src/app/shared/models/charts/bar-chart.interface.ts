import { IBarChartData } from './bar-chart-data.interface'

export interface IBarChart {
  data: IBarChartData[]
  yLabel: string
  xLabel: string
  color: string
}
