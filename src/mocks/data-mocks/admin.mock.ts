import { IRole } from 'src/app/shared/models/user/role.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'

export const mockUser: IUser = {
  approved: false,
  email: 'mockUser1@gmail.com',
  organization: {
    id: 123,
    name: 'abc',
  },
  firstName: 'Max',
  id: '123-456',
  lastName: 'Mustermann',
  roles: ['some', 'role'],
  username: 'mock-user-1',
  createdTimestamp: 1603140166809,
}

export const mockUserSuperAdmin: IUser = {
  approved: false,
  email: 'mockUser1@gmail.com',
  organization: {
    id: 123,
    name: 'abc',
  },
  firstName: 'Max',
  id: '123-456',
  lastName: 'Mustermann',
  roles: ['SUPER_ADMIN'],
  username: 'mock-user-1',
  createdTimestamp: 1603140166809,
}

export const mockUserResearcher: IUser = {
  approved: false,
  email: 'mockUser1@gmail.com',
  organization: {
    id: 123,
    name: 'abc',
  },
  firstName: 'Max',
  id: '123-456',
  lastName: 'Mustermann',
  roles: ['RESEARCHER', 'STUDY_APPROVER'],
  username: 'mock-user-1',
  createdTimestamp: 1603140166809,
}

export const mockUsers: IUser[] = [
  {
    approved: false,
    email: 'mockUser1@gmail.com',
    organization: {
      id: 123,
      name: 'abc',
    },
    firstName: 'Max',
    id: '123-456',
    lastName: 'Mustermann',
    roles: ['some', 'role'],
    username: 'mock-user-1',
    createdTimestamp: 1603140166809,
  },
  {
    approved: false,
    email: 'mockUser2@gmail.com',
    organization: {
      id: 456,
      name: 'def',
    },
    firstName: 'Andrea',
    id: '456-789',
    lastName: 'Musterfrau',
    roles: ['no', 'roles'],
    username: 'mock-user-2',
    createdTimestamp: 1603140166809,
  },
]

export const mockUsers2: IUser[] = [mockUserSuperAdmin, mockUserResearcher]

export const mockRoles: IRole[] = [
  {
    id: '123456',
    name: 'RESEARCHER',
  },
  {
    id: '456789',
    name: 'ADMIN',
  },
]

export const mockOAuthUser = {
  family_name: 'Musterfrau',
  given_name: 'Andrea',
  groups: ['ADMIN'],
  name: 'Andrea Musterfrau',
  sub: '123-456',
  typ: 'ID',
}
