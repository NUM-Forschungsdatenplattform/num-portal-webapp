import { AqlEditorUiModel } from '../../../shared/models/aql/aql-editor-ui.model'

export interface IAqlResolved {
  error: string
  aql: AqlEditorUiModel
}
