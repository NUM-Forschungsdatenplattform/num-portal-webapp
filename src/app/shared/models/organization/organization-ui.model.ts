import { IOrganization } from './organization.interface'

export class OrganizationUiModel {
  id: number | null
  name?: string
  mailDomains: string[]

  constructor(organizationApi?: IOrganization) {
    this.id = organizationApi?.id || null
    this.name = organizationApi?.name
    this.mailDomains = organizationApi?.mailDomains || []
  }

  convertToApi(fillIn?: Partial<IOrganization>): IOrganization {
    return {
      id: this.id,
      name: this.name,
      mailDomains: this.mailDomains,
      ...fillIn,
    }
  }
}
