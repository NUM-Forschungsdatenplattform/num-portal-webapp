import { AqbComparisonOperator } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator.enum'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { IComparisonOperatorOption } from './aqb-comparison-operator-options.interface'

export const COMPARISION_OPERATOR_OPTIONS: IDictionary<string, IComparisonOperatorOption> = {
  [AqbComparisonOperator.Eq]: {
    value: AqbComparisonOperator.Eq,
    sign: '=',
  },
  [AqbComparisonOperator.Neq]: {
    value: AqbComparisonOperator.Neq,
    sign: '!=',
  },
  [AqbComparisonOperator.Gt]: {
    value: AqbComparisonOperator.Gt,
    sign: '>',
  },
  [AqbComparisonOperator.Gt_eq]: {
    value: AqbComparisonOperator.Gt_eq,
    sign: '>=',
  },
  [AqbComparisonOperator.Lt]: {
    value: AqbComparisonOperator.Lt,
    sign: '<',
  },
  [AqbComparisonOperator.Lt_eq]: {
    value: AqbComparisonOperator.Lt_eq,
    sign: '<=',
  },
}

export const COMPARISON_OPERATOR_OPTIONS_EQUALS = [
  COMPARISION_OPERATOR_OPTIONS[AqbComparisonOperator.Eq],
  COMPARISION_OPERATOR_OPTIONS[AqbComparisonOperator.Neq],
]

export const COMPARISON_OPERATOR_OPTIONS_INEQUALS = [
  COMPARISION_OPERATOR_OPTIONS[AqbComparisonOperator.Gt],
  COMPARISION_OPERATOR_OPTIONS[AqbComparisonOperator.Gt_eq],
  COMPARISION_OPERATOR_OPTIONS[AqbComparisonOperator.Lt],
  COMPARISION_OPERATOR_OPTIONS[AqbComparisonOperator.Lt_eq],
]
