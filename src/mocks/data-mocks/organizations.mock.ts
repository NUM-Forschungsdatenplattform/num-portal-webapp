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

export const mockOrganization3: IOrganization = {
  id: 3,
  name: 'name3',
  mailDomains: ['domain3.com'],
}

export const mockOrganization4: IOrganization = {
  id: 4,
  name: 'A',
  mailDomains: ['domain4.com'],
}

export const mockOrganization5: IOrganization = {
  id: 5,
  name: 'ö',
  mailDomains: ['domain5.com'],
}

export const mockOrganization6: IOrganization = {
  id: 6,
  name: '$',
  mailDomains: ['domain6.com'],
}

export const mockOrganization7: IOrganization = {
  id: 7,
  name: 'O',
  mailDomains: ['domain7.com'],
}

export const mockOrganization8: IOrganization = {
  id: 8,
  name: '',
  mailDomains: ['domain8.com'],
}

export const mockOrganization9: IOrganization = {
  id: 9,
  name: '1',
  mailDomains: ['domain9.com'],
}

export const mockOrganization10: IOrganization = {
  id: 10,
  name: 'A',
  mailDomains: ['domain10.com'],
}

export const mockOrganizations: IOrganization[] = [mockOrganization1, mockOrganization2]

export const mockOrganizationsForSort: IOrganization[] = [
  mockOrganization4,
  mockOrganization5,
  mockOrganization6,
  mockOrganization7,
  mockOrganization8,
  mockOrganization9,
  mockOrganization10,
]
