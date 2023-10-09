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

const archetypePredicate = [
  '[a-zA-Z][a-zA-Z0-9_]+', // openEHR
  '-', // -
  '[a-zA-Z][a-zA-Z0-9_]+', // EHR
  '-', // -
  '[a-zA-Z][a-zA-Z0-9_]+', // OBSERVATION
  '.', // .
  '[a-zA-Z][a-zA-Z0-9(-|_)]+', // blood_pressure or blood-pressure
  '.', // .
  'v', // v
  '\\d+(\\.\\d+){0,2}', // 1 || 1.0.0
]

// openEHR-EHR-OBSERVATION.blood_pressure.v1
const joined = '\\b(' + archetypePredicate.map((m) => '(' + m + ')').join('') + ')\\b'

export const archetypePredicateRegExp = new RegExp(joined)
