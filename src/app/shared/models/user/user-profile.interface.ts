import { AvailableRoles } from '../available-roles.enum'
import { IOrganization } from '../organization/organization.interface'

export interface IUserProfile {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  createdTimestamp: number
  roles?: AvailableRoles[]
  approved: boolean
  organization: IOrganization
}
