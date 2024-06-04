import { ReferenceModelType } from '../archetype-query-builder/referencemodel-type.enum'
import { IDictionary } from '../dictionary.interface'

export interface IAqlParameterValuesApi {
  aqlPath: string
  archetypeId: string
  options?: IDictionary<any, any>
  type: ReferenceModelType
  unit?: string
}
