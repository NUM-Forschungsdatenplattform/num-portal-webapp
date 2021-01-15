import { IAqlApi } from './aql.interface'

export class AqlEditorUiModel {
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

  constructor(aql?: IAqlApi) {
    this.id = aql?.id || null
    this.name = aql?.name || undefined
    this.query = aql?.query || ''
    this.purpose = aql?.purpose || undefined
    this.usage = aql?.use || undefined
    this.createDate = aql?.createDate || undefined
    this.modifiedDate = aql?.modifiedDate || undefined
    this.organizationId = aql?.organizationId || undefined
    this.ownerId = aql?.ownerId || undefined
    this.publicAql = aql?.publicAql || true
  }

  public convertToApi(name: string, purpose: string, use: string, publicAql: boolean): IAqlApi {
    return {
      id: this.id,
      name,
      query: this.query,
      purpose,
      use,
      publicAql,
    }
  }
}
