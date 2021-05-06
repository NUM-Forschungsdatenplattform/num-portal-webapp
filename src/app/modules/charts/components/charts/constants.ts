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

import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'

export const CHART_SOFA_SCORE: IBarChart = {
  data: undefined,
  labels: undefined,
  yLabel: 'CHARTS.SOFA_SCORE.YLABEL',
  xLabel: 'CHARTS.SOFA_SCORE.XLABEL',
  color: '#eb586a',
}

export const CHART_SOFA_SCORE_AVG: IBarChart = {
  data: undefined,
  labels: undefined,
  yLabel: 'CHARTS.SOFA_SCORE_AVG.YLABEL',
  xLabel: 'CHARTS.SOFA_SCORE_AVG.XLABEL',
  color: '#fed501',
}
