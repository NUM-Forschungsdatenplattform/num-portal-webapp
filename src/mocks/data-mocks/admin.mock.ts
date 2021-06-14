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

import { IRole } from 'src/app/shared/models/user/role.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { mockOrganization1, mockOrganization2, mockOrganization3 } from './organizations.mock'

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
  id: '123',
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
  id: '456',
  lastName: 'Mustermann',
  roles: ['RESEARCHER', 'STUDY_APPROVER'],
  username: 'mock-user-1',
  createdTimestamp: 1603140166809,
}

export const mockUserStudyCoordinator: IUser = {
  approved: true,
  email: 'mockUserStudyCoordinator@gmail.com',
  organization: {
    id: 321,
    name: 'cba',
  },
  firstName: 'Marianne',
  id: '789',
  lastName: 'Musterfrau',
  roles: ['STUDY_COORDINATOR'],
  username: 'mock-study-coordinator',
  createdTimestamp: 1603140166809,
}

export const mockUserProfile4: IUser = {
  id: '4',
  username: 'username-4',
  firstName: 'ö',
  lastName: '%',
  email: 'mockUser3@email.com',
  createdTimestamp: new Date('2021-01-01T00:00:00.000+01:00').getTime(),
  roles: ['SUPER_ADMIN'],
  approved: true,
  organization: mockOrganization2,
}

export const mockUserProfile5: IUser = {
  id: '5',
  username: 'username-5',
  firstName: '',
  lastName: 'Ü',
  email: 'mockUser5@email.com',
  createdTimestamp: new Date('2020-01-01T00:00:00.000+01:00').getTime(),
  roles: ['SUPER_ADMIN'],
  approved: true,
  organization: mockOrganization2,
}

export const mockUserProfile6: IUser = {
  id: '6',
  username: 'username-6',
  firstName: 'A',
  lastName: '',
  email: 'mockUser5@email.com',
  createdTimestamp: new Date('2021-01-01T00:00:00.000+01:00').getTime(),
  roles: ['SUPER_ADMIN'],
  approved: true,
  organization: mockOrganization1,
}

export const mockUserProfile7: IUser = {
  id: '7',
  username: 'username-7',
  firstName: 'Ö',
  lastName: 'Ü',
  email: 'mockUser7@email.com',
  createdTimestamp: new Date('2021-02-01T00:00:00.000+01:00').getTime(),
  roles: ['SUPER_ADMIN'],
  approved: false,
  organization: mockOrganization3,
}

export const mockUserProfile8: IUser = {
  id: '8',
  username: 'username-8',
  firstName: '/',
  lastName: 'a',
  email: 'mockUser7@email.com',
  createdTimestamp: new Date('2021-01-12T00:00:00.000+01:00').getTime(),
  roles: ['SUPER_ADMIN'],
  approved: false,
  organization: mockOrganization2,
}

export const mockUsersForSort = [
  mockUserProfile4,
  mockUserProfile5,
  mockUserProfile6,
  mockUserProfile7,
  mockUserProfile8,
]

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

export const mockUsersToFilter: IUser[] = [mockUserResearcher, mockUserStudyCoordinator]
