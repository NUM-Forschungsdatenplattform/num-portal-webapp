import { IAqlApi } from './aql.interface'

export class AqlBuilderUiModel {
  id: number
  name: string
  query: string
  purpose: string
  use: string
  isPublic: boolean

  constructor(aql?: IAqlApi) {
    this.id = aql?.id || 0
    this.name = aql?.name || undefined
    this.query = aql?.query || undefined
  }
}
