import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { IBarChart } from 'src/app/shared/models/charts/chart.interface'
import { CHART_SOFA_SCORE, CHART_SOFA_SCORE_AVG } from './constants'

@Component({
  selector: 'num-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()

  selectedClinic: string
  clinics: string[]
  chartSofaScore: IBarChart
  chartSofaScoreAvg: IBarChart

  constructor(private translateService: TranslateService, private aqlService: AqlService) {}

  ngOnInit(): void {
    this.getSofaScoreAverage()
    this.getClinics()

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe(() => {
        this.getSofaScoreGrouped()
        this.getSofaScoreAverage()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getClinics(): void {
    this.aqlService.getClinics().subscribe((clinics) => {
      this.clinics = clinics
      this.selectedClinic = clinics[Math.floor(Math.random() * clinics.length)]
      this.getSofaScoreGrouped()
    })
  }

  getSofaScoreGrouped(): void {
    console.log(this.selectedClinic)
    this.aqlService.getSofaScoreGrouped(this.selectedClinic).subscribe((chartData) => {
      this.chartSofaScore = {
        ...CHART_SOFA_SCORE,
        data: chartData.data,
        labels: chartData.labels,
      }
    })
  }

  getSofaScoreAverage(): void {
    this.aqlService.getSofaScoreAverage().subscribe((chartData) => {
      this.chartSofaScoreAvg = {
        ...CHART_SOFA_SCORE_AVG,
        data: chartData.data,
        labels: chartData.labels,
      }
    })
  }

  handleSelectClick(): void {
    this.getSofaScoreGrouped()
  }
}
