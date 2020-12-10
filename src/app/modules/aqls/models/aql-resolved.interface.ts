import { AqlBuilderUiModel } from '../../../shared/models/aql/aql-builder-ui.model'

export interface IAqlResolved {
  error: string
  aql: AqlBuilderUiModel
}
