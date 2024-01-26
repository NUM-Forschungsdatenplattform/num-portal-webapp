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

import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'
import { CHART_SOFA_SCORE, CHART_SOFA_SCORE_AVG } from './constants'

@Component({
  selector: 'num-manager-charts',
  templateUrl: './manager-charts.component.html',
  styleUrls: ['./manager-charts.component.scss'],
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
    private contentService: ContentService,
  ) {}

  ngOnInit(): void {
    this.getSofaScoreAverage()
    this.getClinics()

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe(() => {
        this.getSofaScoreDistribution()
        this.getSofaScoreAverage()
      }),
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
      }),
    )
  }

  getSofaScoreDistribution(): void {
    if (this.sofaScoreDistributionSubscription) {
      this.sofaScoreDistributionSubscription.unsubscribe()
    }

    this.sofaScoreDistributionSubscription = this.contentService
      .getSofaScoreDistribution(this.selectedClinic)
      .subscribe(
        (chartData) => {
          const result = Object.entries(chartData).map((entry) => {
            return { name: entry[0], value: entry[1] }
          })

          this.chartSofaScore = {
            ...CHART_SOFA_SCORE,
            data: result,
          }
        },
        (_error) => {
          this.chartSofaScore = {
            ...CHART_SOFA_SCORE,
            data: [],
          }
        },
      )
  }

  getSofaScoreAverage(): void {
    this.subscriptions.add(
      this.contentService.getSofaScoreAverage().subscribe(
        (chartData) => {
          const result = Object.entries(chartData).map((entry) => {
            return { name: entry[0], value: entry[1] }
          })

          this.chartSofaScoreAvg = {
            ...CHART_SOFA_SCORE_AVG,
            data: result,
          }
        },
        (_error) => {
          this.chartSofaScoreAvg = {
            ...CHART_SOFA_SCORE_AVG,
            data: [],
          }
        },
      ),
    )
  }

  handleSelectClick(): void {
    this.getSofaScoreDistribution()
  }
}
