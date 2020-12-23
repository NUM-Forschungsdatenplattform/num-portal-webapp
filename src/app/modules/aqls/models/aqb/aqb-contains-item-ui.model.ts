import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'

export class AqbContainsItemUiModel {
  readonly type = ConnectorNodeType.Aqb_Item
  compositionId: string
  compositionReferenceId: number
  archetypeId: string
  archetypeReferenceId: number
  constructor(
    compositionId: string,
    compositionReferenceId: number,
    archetypeId: string,
    archetypeReferenceId: number
  ) {
    this.compositionId = compositionId
    this.compositionReferenceId = compositionReferenceId
    this.archetypeId = archetypeId
    this.archetypeReferenceId = archetypeReferenceId
  }
}
