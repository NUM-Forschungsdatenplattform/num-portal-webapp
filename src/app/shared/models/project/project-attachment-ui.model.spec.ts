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
import {
  attachmentApiMock1,
  attachmentApiMock2,
} from 'src/mocks/data-mocks/project-attachment.mock'
import { ProjectAttachmentUiModel } from './project-attachment-ui.model'

describe('ProjectAttachmentUiModel', () => {
  it('should parse all values as expected to ui model', () => {
    const uiModel = new ProjectAttachmentUiModel(attachmentApiMock1)
    expect(uiModel.id).toEqual(attachmentApiMock1.id)
    expect(uiModel.name).toEqual(attachmentApiMock1.name)
    expect(uiModel.reviewCounter).toEqual(attachmentApiMock1.reviewCounter)
    expect(uiModel.description).toEqual(attachmentApiMock1.description)
    expect(uiModel.uploadDate).toBeInstanceOf(Date)
    expect(uiModel.uploadDate).toEqual(new Date(attachmentApiMock1.uploadDate))
  })

  it('should parse all values as expected to api model', () => {
    const uiModel = new ProjectAttachmentUiModel(attachmentApiMock2)
    expect(uiModel.convertToApi()).toEqual({
      ...attachmentApiMock2,
      uploadDate: new Date(attachmentApiMock2.uploadDate).toISOString(),
    })
  })
})
