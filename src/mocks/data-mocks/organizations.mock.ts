import { IOrganization } from 'src/app/shared/models/organization/organization.interface'

export const mockOrganization1: IOrganization = {
  id: 1,
  name: 'name1',
  mailDomains: ['domain.de'],
}

export const mockOrganization2: IOrganization = {
  id: 2,
  name: 'name2',
  mailDomains: ['domain.com'],
}

export const mockOrganizations: IOrganization[] = [mockOrganization1, mockOrganization2]
