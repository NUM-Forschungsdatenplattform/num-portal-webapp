export interface IAqlApi {
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
  // TODO: Ask for a BE change and adopt to the correct model
  description?: string
}
