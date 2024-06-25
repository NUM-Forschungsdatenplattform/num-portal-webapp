import { IDictionary } from '../dictionary.interface'
import { AqlParameterOperator } from './aql-parameter-operator.type'
import { AqlParameterValueType } from './aql-parameter-value-type.enum'

export interface IAqlParameter {
  name: string
  nameWithDollar: string
  value: string | number | boolean | Date | moment.Moment | moment.Duration
  operator: AqlParameterOperator
  possibleOperators: AqlParameterOperator[]
  path: string
  archetypeId: string
  options?: IDictionary<any, any>
  valueType?: AqlParameterValueType
  isMetaFetched?: boolean
  isDisabled: boolean
}
