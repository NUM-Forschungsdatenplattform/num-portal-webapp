import { IProjectAttachmentApi } from './project-attachment-api.interface'

export class ProjectAttachmentUiModel {
  id: number
  name: string
  description?: string
  uploadDate: Date
  reviewCounter: number

  constructor({ id, name, reviewCounter, uploadDate, description }: IProjectAttachmentApi) {
    this.id = id
    this.name = name
    this.reviewCounter = reviewCounter
    this.uploadDate = new Date(uploadDate)
    this.description = description
  }

  convertToApi(): IProjectAttachmentApi {
    const { id, name, reviewCounter, description, uploadDate } = this

    return {
      id,
      name,
      reviewCounter,
      description,
      uploadDate: uploadDate.toISOString(),
    }
  }
}
