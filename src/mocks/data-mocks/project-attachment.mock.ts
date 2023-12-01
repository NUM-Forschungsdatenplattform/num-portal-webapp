/**
 * Copyright 2023 Vitagroup AG
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
import { IProjectAttachmentApi } from '../../app/shared/models/project/project-attachment-api.interface'
import { generateRandomId } from '../mock-utils/mock-generator.utils'

export const attachmentApiMock1: IProjectAttachmentApi = {
  id: generateRandomId(),
  name: 'CHEESECAKE-IPSUM.pdf',
  description: 'Cupcake Ipsum',
  uploadDate: '2023-11-24T14:54:08.475001Z',
  reviewCounter: 0,
}
export const attachmentApiMock2: IProjectAttachmentApi = {
  id: generateRandomId(),
  name: 'LOREM-IPSUM.pdf',
  description: 'Lorem Ipsum',
  uploadDate: '2023-11-24T14:54:08.539756Z',
  reviewCounter: 0,
}

export const attachmentApiMock3: IProjectAttachmentApi = {
  id: generateRandomId(),
  name: 'BACON-IPSUM.pdf',
  description: 'Bacon Ipsum',
  uploadDate: '2023-11-24T14:54:08.579344Z',
  reviewCounter: 0,
}

export const attachmentApiMock4: IProjectAttachmentApi = {
  id: generateRandomId(),
  name: 'BACON-IPSUM-FILLER.pdf',
  description: 'Bacon Ipsum with filler',
  uploadDate: '2023-11-24T14:54:08.616182Z',
  reviewCounter: 0,
}

export const attachmentApiMock5: IProjectAttachmentApi = {
  id: generateRandomId(),
  name: 'W3.ORG-DUMMY.pdf',
  description: 'W3.org dummy PDF file',
  uploadDate: '2023-11-24T14:39:51.858193Z',
  reviewCounter: 0,
}

export const attachmentApiMocks = [
  attachmentApiMock1,
  attachmentApiMock2,
  attachmentApiMock3,
  attachmentApiMock4,
  attachmentApiMock5,
]
