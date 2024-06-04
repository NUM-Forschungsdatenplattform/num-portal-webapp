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
