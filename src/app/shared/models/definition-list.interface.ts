import { DefinitionType } from './definition-type.enum'

export interface IDefinitionList {
  title: string
  description: string | string[] | boolean | Date
  type?: DefinitionType
}
