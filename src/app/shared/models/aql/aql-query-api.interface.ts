export interface IAqlQueryApi {
  id: number
  name: string
  description: string
  query: string
  createDate: string
  modifiedDate: string
  organizationId: string
  ownerId: string
  publicAql: string
}
