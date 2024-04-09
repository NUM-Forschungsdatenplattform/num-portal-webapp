import { IOrganization } from './organization.interface'

export class OrganizationUiModel {
  id: number | null
  name?: string
  mailDomains: string[]
  active?: boolean

  constructor(organizationApi?: IOrganization) {
    this.id = organizationApi?.id || null
    this.name = organizationApi?.name
    this.mailDomains = organizationApi?.mailDomains || []
    if (organizationApi?.active == null) {
      this.active = true
    } else {
      this.active = organizationApi?.active
    }
  }

  convertToApi(fillIn?: Partial<IOrganization>): IOrganization {
    return {
      id: this.id,
      name: this.name,
      mailDomains: this.mailDomains,
      active: this.active,
      ...fillIn,
    }
  }
}
