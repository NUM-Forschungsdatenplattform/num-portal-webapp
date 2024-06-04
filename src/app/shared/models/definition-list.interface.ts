import { DefinitionType } from './definition-type.enum'
import { ProjectAttachmentUiModel } from './project/project-attachment-ui.model'
import { ProjectUiModel } from './project/project-ui.model'

export interface IDefinitionList {
  title: string
  description: string | string[] | ProjectAttachmentUiModel[] | boolean | Date
  type?: DefinitionType
  extraOptions?: {
    project?: ProjectUiModel
    showAttachmentSelects?: boolean
  }
}
