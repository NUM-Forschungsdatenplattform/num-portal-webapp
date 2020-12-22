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
  use: string
  isPublic: boolean

  constructor(aql?: IAqlApi) {
    this.id = aql?.id || 0
    this.name = aql?.name || undefined
    this.query = aql?.query || undefined
    this.description = aql?.description || undefined
    this.createDate = aql?.createDate || undefined
    this.modifiedDate = aql?.modifiedDate || undefined
    this.organizationId = aql?.organizationId || undefined
    this.ownerId = aql?.ownerId || undefined
    this.publicAql = aql?.publicAql
  }
}
