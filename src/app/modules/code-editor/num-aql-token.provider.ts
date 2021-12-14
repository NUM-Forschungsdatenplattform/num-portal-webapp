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

import { archetypePredicateRegExp } from './regular-expressions/archetype-predicate.regex'
import { nodePredicateRegExp } from './regular-expressions/node-predicate.regex'
import { comparisonOperatorsRegExp } from './regular-expressions/comparison-operators.regex'
import { logicalOperatorsRegExp } from './regular-expressions/logical-operators.regex'
import { queryStructureRegExp } from './regular-expressions/query-structure.regex'
import { aqlFunctionRegExp } from './regular-expressions/aql-functions.regex'
import { ehrReferenceModelClassRegExp } from './regular-expressions/ehr-reference-model-class.regex'
import { booleanRegExp } from './regular-expressions/boolean.regex'
import { parameterRegExp } from './regular-expressions/parameter.regex'
import {
  dateBasicRegExp,
  dateExtendedRegExp,
  datetimeExtendedRegExp,
  datetimePortalRegExp,
  timeExtendedRegExp,
  timePortalRegExp,
} from './regular-expressions/datetime.regex'

/* eslint-disable no-useless-escape */
export const numAqlTokenProvider: monaco.languages.IMonarchLanguage = {
  ignoreCase: true,

  tokenizer: {
    root: [
      { include: '@queryStructure' },
      { include: '@ehrReferenceModelClass' },
      { include: '@archetypePredicate' },
      { include: '@nodePredicate' },
      { include: '@booleans' },
      { include: '@parameters' },
      { include: '@operators' },
      { include: '@functions' },
      { include: '@datetimes' },
      { include: '@numbers' },
      { include: '@strings' },
    ],
    queryStructure: [[queryStructureRegExp, 'num-queryStructure']],
    ehrReferenceModelClass: [[ehrReferenceModelClassRegExp, 'num-referenceModel']],
    archetypePredicate: [[archetypePredicateRegExp, 'num-archetypePredicate']],
    nodePredicate: [[nodePredicateRegExp, 'num-nodePredicate']],
    booleans: [[booleanRegExp, 'num-boolean']],
    parameters: [[parameterRegExp, 'num-parameter']],
    operators: [
      [comparisonOperatorsRegExp, 'num-operator'],
      [logicalOperatorsRegExp, 'num-operator'],
    ],
    functions: [[aqlFunctionRegExp, 'num-function']],
    datetimes: [
      [datetimeExtendedRegExp, 'num-datetime'],
      [datetimePortalRegExp, 'num-datetime'],
      [dateExtendedRegExp, 'num-datetime'],
      [dateBasicRegExp, 'num-datetime'],
      [timeExtendedRegExp, 'num-datetime'],
      [timePortalRegExp, 'num-datetime'],
    ],
    numbers: [[/((\d+(\.\d*)?)|(\.\d+))/, 'num-number']],
    strings: [
      [/"(.*?)"/, 'num-string'],
      [/\'(.*?)\'/, 'num-string'],
    ],
  },
}
