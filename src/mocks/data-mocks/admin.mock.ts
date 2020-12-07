import { IUser } from 'src/app/shared/models/admin/user.interface'

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
