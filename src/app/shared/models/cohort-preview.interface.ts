import { IDictionary } from './dictionary.interface'

export interface ICohortPreviewApi {
  ages: IDictionary<string, number>
  count: number
  hospitals: IDictionary<string, number>
}
