import { IUserProfile } from '../../app/shared/models/user/user-profile.interface'
import { mockOrganization1, mockOrganization2 } from './organizations.mock'

export const mockUserProfile1: IUserProfile = {
  id: '1',
  username: 'username-1',
  firstName: 'user1-firstname',
  lastName: 'user1-lastname',
  email: 'mockUser1@email.com',
  createdTimestamp: 1603140166809,
  roles: ['role-1', 'role-2'],
  approved: true,
  organization: mockOrganization1,
}

export const mockUserProfile2: IUserProfile = {
  id: '2',
  username: 'username-2',
  firstName: 'user2-firstname',
  lastName: 'user2-lastname',
  email: 'mockUser2@email.com',
  createdTimestamp: 1603140166809,
  roles: ['role-2', 'role-3'],
  approved: true,
  organization: mockOrganization2,
}
