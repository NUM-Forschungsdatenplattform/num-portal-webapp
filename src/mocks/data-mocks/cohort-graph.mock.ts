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

import { ICohortPreviewApi } from 'src/app/shared/models/cohort-preview.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'

export const mockInstitutionGraphData: IDictionary<string, number> = {
  'Test clinic 1': 300,
  'Test clinic 2': 842,
  'Test clinic 3': 123,
  'Test clinic 4': 742,
}

export const mockAgeGraphData: IDictionary<string, number> = {
  '20-30': 361,
  '30-40': 471,
  '40-50': 841,
  '50-60': 162,
  '60-70': 462,
  '70-80': 127,
  '80-90': 12,
}

export const mockCohortPreviewData: ICohortPreviewApi = {
  ages: mockAgeGraphData,
  count: 123,
  hospitals: mockInstitutionGraphData,
}
