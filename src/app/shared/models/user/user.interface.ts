import { IOrganization } from '../organization/organization.interface'

export interface IUser {
  approved?: boolean
  email: string
  firstName: string
  id: string
  lastName: string
  organization?: IOrganization
  roles?: string[]
  username: string
  createdTimestamp: number
  enabled?: boolean
}
