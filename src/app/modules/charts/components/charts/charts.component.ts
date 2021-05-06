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
  selector: 'num-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()
  sofaScoreDistributionSubscription = new Subscription()

  selectedClinic: string
  clinics: string[]
  chartSofaScore: IBarChart
  chartSofaScoreAvg: IBarChart

  constructor(private translateService: TranslateService, private contentService: ContentService) {}

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
    this.sofaScoreDistributionSubscription.unsubscribe()

    this.sofaScoreDistributionSubscription.add(
      this.contentService.getSofaScoreDistribution(this.selectedClinic).subscribe(
        (chartData) => {
          this.chartSofaScore = {
            ...CHART_SOFA_SCORE,
            data: Object.values(chartData),
            labels: Object.keys(chartData),
          }
        },
        (error) => {
          this.chartSofaScore = {
            ...CHART_SOFA_SCORE,
            data: [],
            labels: [],
          }
        }
      )
    )
  }

  getSofaScoreAverage(): void {
    this.subscriptions.add(
      this.contentService.getSofaScoreAverage().subscribe(
        (chartData) => {
          this.chartSofaScoreAvg = {
            ...CHART_SOFA_SCORE_AVG,
            data: Object.values(chartData),
            labels: Object.keys(chartData),
          }
        },
        (error) => {
          this.chartSofaScoreAvg = {
            ...CHART_SOFA_SCORE_AVG,
            data: [],
            labels: [],
          }
        }
      )
    )
  }

  handleSelectClick(): void {
    this.getSofaScoreDistribution()
  }
}
