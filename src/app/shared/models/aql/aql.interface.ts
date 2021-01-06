export interface IAqlApi {
  id: number
  name: string
  query: string
  purpose: string
  usage: string
  publicAql: boolean
  createDate?: string
  modifiedDate?: string
  organizationId?: string
  ownerId?: string
  description?: string
}
