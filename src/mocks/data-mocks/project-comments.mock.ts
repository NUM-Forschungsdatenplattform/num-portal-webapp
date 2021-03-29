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

import { IProjectComment } from 'src/app/shared/models/project/project-comment.interface'
import { mockUser } from './admin.mock'

export const projectCommentMock1: IProjectComment = {
  text: 'This is mock no. 1',
  id: 1,
  projectId: 1,
  createDate: '2021-01-18T17:15:39.848884+01:00',
  author: mockUser,
}

export const projectCommentMock2: IProjectComment = {
  text: 'This is mock no. 1',
  id: 2,
  projectId: 1,
  createDate: '2021-01-18T17:15:39.848884+01:00',
  author: mockUser,
}

export const projectCommentMocks = [projectCommentMock1, projectCommentMock2]
