import { AqbUiModel } from 'src/app/modules/aqls/models/aqb/aqb-ui.model'
import { IArchetypeQueryBuilderResponse } from './archetype-query-builder.response.interface'

export interface IAqlBuilderDialogOutput {
  model: AqbUiModel
  selectedTemplateIds?: string[]
  result?: IArchetypeQueryBuilderResponse
}
