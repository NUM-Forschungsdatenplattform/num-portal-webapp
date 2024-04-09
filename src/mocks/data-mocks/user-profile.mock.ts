import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IUserProfile } from '../../app/shared/models/user/user-profile.interface'
import { mockOrganization1, mockOrganization2 } from './organizations.mock'

export const mockUserProfile1: IUserProfile = {
  id: '1',
  username: 'username-1',
  firstName: 'user1-firstname',
  lastName: 'user1-lastname',
  email: 'mockUser1@email.com',
  createdTimestamp: 1603140166809,
  roles: [AvailableRoles.OrganizationAdmin, AvailableRoles.ContentAdmin],
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
  roles: [AvailableRoles.ContentAdmin, AvailableRoles.OrganizationAdmin],
  approved: true,
  organization: mockOrganization2,
}

export const mockUserProfile3: IUserProfile = {
  id: '3',
  username: 'username-2',
  firstName: 'user2-firstname',
  lastName: 'user2-lastname',
  email: 'mockUser2@email.com',
  createdTimestamp: 1603140166809,
  roles: [AvailableRoles.SuperAdmin],
  approved: true,
  organization: mockOrganization2,
}

export const mockManagerUserProfile: IUserProfile = {
  id: '4',
  username: 'manager-user',
  firstName: 'manager-firstname',
  lastName: 'manager-lastname',
  email: 'manager@email.com',
  createdTimestamp: new Date('2021-06-15T12:00:00.000+02:00').valueOf(),
  roles: [AvailableRoles.Manager],
  approved: true,
  organization: mockOrganization1,
}

export const mockProjectLeadProfile: IUserProfile = {
  id: '5',
  username: 'project-lead-user',
  firstName: 'project-lead-firstname',
  lastName: 'project-lead-lastname',
  email: 'project-lead@email.com',
  createdTimestamp: new Date('2021-07-27T08:08:43.000+02:00').valueOf(),
  roles: [AvailableRoles.StudyCoordinator],
  approved: true,
  organization: mockOrganization1,
}

export const mockUserProfileUnapproved: IUserProfile = {
  id: '6',
  username: 'username-6',
  firstName: 'user6-firstname',
  lastName: 'user6-lastname',
  email: 'mockUser6@email.com',
  createdTimestamp: 1603140166809,
  roles: [],
  approved: false,
  organization: undefined,
}
