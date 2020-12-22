import { IAqlApi } from './aql.interface'
import { IPhenotypeQueryApi } from '../phenotype/phenotype-query-api.interface'
import { ConnectorNodeType } from '../connector-node-type.enum'

export class AqlBuilderUiModel {
  id: number
  name: string
  query: string
  description: string
  createDate: string
  modifiedDate: string
  organizationId: string
  ownerId: string
  publicAql: boolean
  purpose: string
  usage: string
  isPublic: boolean

  constructor(aql?: IAqlApi) {
    this.id = aql?.id || 0
    this.name = aql?.name || undefined
    this.query = aql?.query || undefined
    this.purpose = aql?.purpose || undefined
    this.usage = aql?.usage || undefined
    this.createDate = aql?.createDate || undefined
    this.modifiedDate = aql?.modifiedDate || undefined
    this.organizationId = aql?.organizationId || undefined
    this.ownerId = aql?.ownerId || undefined
    this.publicAql = aql?.publicAql
  }

  public convertToApi(
    name?: string,
    purpose?: string,
    usage?: string,
    publicAql?: boolean
  ): IAqlApi {
    return {
      id: this.id,
      name: name || this.name,
      query: 'tekam',
      purpose: purpose || this.purpose,
      usage: usage || this.usage,
      createDate: this.createDate,
      modifiedDate: this.modifiedDate,
      organizationId: this.organizationId,
      ownerId: this.ownerId,
      publicAql: publicAql || this.publicAql,
    }
  }
}
