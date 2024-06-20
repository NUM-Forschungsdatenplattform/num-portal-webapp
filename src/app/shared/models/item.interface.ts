import { AqlParameterValueType } from './aql/aql-parameter-value-type.enum'
import { IDictionary } from './dictionary.interface'

export interface IItem {
  value: any
  valueType: AqlParameterValueType
  name: string
  options?: IDictionary<any, any>
  unit?: string
}
