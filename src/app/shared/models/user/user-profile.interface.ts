import { IOrganization } from '../organization/organization.interface'

export interface IUserProfile {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  createdTimestamp: number
  roles?: string[]
  approved: boolean
  organization: IOrganization
}
