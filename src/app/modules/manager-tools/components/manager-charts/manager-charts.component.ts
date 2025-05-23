import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService, TranslatePipe } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'
import { CHART_SOFA_SCORE, CHART_SOFA_SCORE_AVG } from './constants'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatCard } from '@angular/material/card'
import { BarChartComponent } from '../bar-chart/bar-chart.component'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatSelect, MatOption } from '@angular/material/select'

@Component({
  selector: 'num-manager-charts',
  templateUrl: './manager-charts.component.html',
  styleUrls: ['./manager-charts.component.scss'],
  imports: [
    FlexModule,
    MatCard,
    BarChartComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    TranslatePipe,
  ],
})
export class ManagerChartsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()
  sofaScoreDistributionSubscription = new Subscription()

  selectedClinic: string
  clinics: string[]
  chartSofaScore: IBarChart
  chartSofaScoreAvg: IBarChart

  constructor(
    private translateService: TranslateService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.getSofaScoreAverage()
    this.getClinics()

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe(() => {
        this.getSofaScoreDistribution()
        this.getSofaScoreAverage()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.sofaScoreDistributionSubscription.unsubscribe()
  }

  getClinics(): void {
    this.subscriptions.add(
      this.contentService.getClinics().subscribe((clinics) => {
        this.clinics = clinics
        this.selectedClinic = clinics[Math.floor(Math.random() * clinics.length)]
        this.getSofaScoreDistribution()
      })
    )
  }

  getSofaScoreDistribution(): void {
    if (this.sofaScoreDistributionSubscription) {
      this.sofaScoreDistributionSubscription.unsubscribe()
    }

    this.sofaScoreDistributionSubscription = this.contentService
      .getSofaScoreDistribution(this.selectedClinic)
      .subscribe({
        next: (chartData) => {
          const result = Object.entries(chartData).map((entry) => {
            return { name: entry[0], value: entry[1] }
          })

          this.chartSofaScore = {
            ...CHART_SOFA_SCORE,
            data: result,
          }
        },
        error: (_error) => {
          this.chartSofaScore = {
            ...CHART_SOFA_SCORE,
            data: [],
          }
        },
      })
  }

  getSofaScoreAverage(): void {
    this.subscriptions.add(
      this.contentService.getSofaScoreAverage().subscribe({
        next: (chartData) => {
          const result = Object.entries(chartData).map((entry) => {
            return { name: entry[0], value: entry[1] }
          })

          this.chartSofaScoreAvg = {
            ...CHART_SOFA_SCORE_AVG,
            data: result,
          }
        },
        error: (_error) => {
          this.chartSofaScoreAvg = {
            ...CHART_SOFA_SCORE_AVG,
            data: [],
          }
        },
      })
    )
  }

  handleSelectClick(): void {
    this.getSofaScoreDistribution()
  }
}
