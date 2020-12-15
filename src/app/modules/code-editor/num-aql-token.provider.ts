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
  timeExtendedRegExp,
} from './regular-expressions/datetime.regex'

export const numAqlTokenProvider: monaco.languages.IMonarchLanguage = {
  ignoreCase: true,

  tokenizer: {
    root: [
      { include: '@queryStructure' },
      { include: '@ehrReferenceModelClass' },
      { include: '@referenceModelPaths' },
      { include: '@atPaths' },
      { include: '@booleans' },
      { include: '@parameters' },
      { include: '@operators' },
      { include: '@functions' },
      { include: '@datetimes' },
      { include: '@numbers' },
    ],
    queryStructure: [[queryStructureRegExp, 'num-keyword']],
    ehrReferenceModelClass: [[ehrReferenceModelClassRegExp, 'num-referenceModel']],
    referenceModelPaths: [[archetypePredicateRegExp, 'num-path']],
    atPaths: [[nodePredicateRegExp, 'num-path']],
    booleans: [[booleanRegExp, 'num-boolean']],
    parameters: [[parameterRegExp, 'num-parameter']],
    operators: [
      [comparisonOperatorsRegExp, 'num-operator'],
      [logicalOperatorsRegExp, 'num-operator'],
    ],
    functions: [[aqlFunctionRegExp, 'num-operator']],
    datetimes: [
      [datetimeExtendedRegExp, 'num-datetime'],
      [dateExtendedRegExp, 'num-datetime'],
      [dateBasicRegExp, 'num-datetime'],
      [timeExtendedRegExp, 'num-datetime'],
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, 'number'],
      [/[$][+-]*\d*(\.\d*)?/, 'number'],
      [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number'],
    ],
  },
}
