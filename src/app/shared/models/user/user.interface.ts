import { IOrganization } from './organization.interface'

export interface IUser {
  approved?: boolean
  email: string
  organization?: IOrganization
  firstName: string
  id: string
  lastName: string
  roles?: string[]
  username: string
}
