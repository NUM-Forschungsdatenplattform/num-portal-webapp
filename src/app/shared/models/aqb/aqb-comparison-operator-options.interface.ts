import { AqbComparisonOperator } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-comparison-operator.enum'

export interface IComparisonOperatorOption {
  value: AqbComparisonOperator
  sign: string
}
