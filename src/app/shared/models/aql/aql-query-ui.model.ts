import { IAqlApi } from './aql.interface'

export class AqlQueryUiModel {
  id: number
  name: string
  description: string
  query: string
  userId: string
  organizationId: string
  isPublic: boolean

  constructor(aql?: IAqlApi) {
    this.id = aql?.id || 0
    this.name = aql?.name || undefined
    this.query = aql?.query || undefined
  }
}
