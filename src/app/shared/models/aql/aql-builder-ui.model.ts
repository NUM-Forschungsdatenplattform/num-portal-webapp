import { IAqlApi } from './aql.interface'

export class AqlBuilderUiModel {
  id: number
  name: string
  query: string
  purpose: string
  usage: string
  createDate: string
  modifiedDate: string
  organizationId: string
  ownerId: string
  publicAql: boolean
  description?: string

  constructor(aql?: AqlBuilderUiModel) {
    this.id = aql?.id || 0
    this.name = aql?.name || undefined
    this.query = aql?.query || ''
    this.purpose = aql?.purpose || undefined
    this.usage = aql?.usage || undefined
    this.createDate = aql?.createDate || undefined
    this.modifiedDate = aql?.modifiedDate || undefined
    this.organizationId = aql?.organizationId || undefined
    this.ownerId = aql?.ownerId || undefined
    this.publicAql = aql?.publicAql
  }

  public convertToApi(name: string, purpose: string, usage: string, publicAql: boolean): IAqlApi {
    return {
      id: this.id,
      name,
      query: this.query,
      purpose,
      usage,
      publicAql,
    }
  }
}
