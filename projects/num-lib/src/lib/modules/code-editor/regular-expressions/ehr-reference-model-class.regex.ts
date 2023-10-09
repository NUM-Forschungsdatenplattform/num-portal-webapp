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

const ehrReferenceModelClasses = [
  'EHR',
  'EHR_ACCESS',
  'EHR_STATUS',
  'CLUSTER',
  'VERSION',
  'VERSIONED_OBJECT',
  'VERSIONED_EHR_ACCESS',
  'VERSIONED_EHR_STATUS',
  'VERSIONED_FOLDER',
  'VERSIONED_COMPOSITION',
  'CONTRIBUTION',
  'COMPOSITION',
  'SECTION',
  'ADMIN_ENTRY',
  'OBSERVATION',
  'EVALUATION',
  'INSTRUCTION',
  'ACTION',
]

const joined = '\\b(' + ehrReferenceModelClasses.join('|') + ')\\b'

export const ehrReferenceModelClassRegExp = new RegExp(joined)
