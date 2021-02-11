import { AqbUiModel } from 'src/app/modules/aqls/models/aqb/aqb-ui.model'
import { AqlBuilderDialogMode } from './aql-builder-dialog-mode.enum'

export interface IAqlBuilderDialogInput {
  model: AqbUiModel
  mode: AqlBuilderDialogMode
  selectedTemplateIds?: string[]
  allowedTemplates?: string[]
}
