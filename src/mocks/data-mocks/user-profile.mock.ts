/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

export const mockUserProfile3: IUserProfile = {
  id: '3',
  username: 'username-2',
  firstName: 'user2-firstname',
  lastName: 'user2-lastname',
  email: 'mockUser2@email.com',
  createdTimestamp: 1603140166809,
  roles: ['SUPER_ADMIN'],
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
