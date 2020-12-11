import { IUserDetails } from 'src/app/shared/models/user/user-details.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'

export const mockUser: IUser = {
  approved: false,
  email: 'mockUser1@gmail.com',
  externalOrganizationId: '123',
  firstName: 'Max',
  id: '123-456',
  lastName: 'Mustermann',
  roles: ['some', 'role'],
  username: 'mock-user-1',
}

export const mockUnapprovedUsers: IUser[] = [
  {
    approved: false,
    email: 'mockUser1@gmail.com',
    externalOrganizationId: '123',
    firstName: 'Max',
    id: '123-456',
    lastName: 'Mustermann',
    roles: ['some', 'role'],
    username: 'mock-user-1',
  },
  {
    approved: false,
    email: 'mockUser2@gmail.com',
    externalOrganizationId: '456',
    firstName: 'Andrea',
    id: '456-789',
    lastName: 'Musterfrau',
    roles: ['no', 'roles'],
    username: 'mock-user-2',
  },
]

export const mockUserDetails: IUserDetails = {
  approved: false,
  organizationId: 'mock-organization',
  userId: '123-456',
}
