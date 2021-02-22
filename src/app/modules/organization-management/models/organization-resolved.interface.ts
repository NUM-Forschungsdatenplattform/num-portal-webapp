import { IOrganization } from 'src/app/shared/models/user/organization.interface'

export interface IOrganizationResolved {
  error: string
  organization: IOrganization | undefined
}
