import { IAqbContainmentNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-containment-node.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'

const archetypeToClassType = /openEHR-EHR-([A-Z]*)\..*/

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

  convertToApi(): IAqbContainmentNode {
    const match = this.archetypeId.match(archetypeToClassType)
    return {
      _type: AqbNodeType.Containment,
      type: match[1],
      identifier: `o${this.archetypeReferenceId}`,
      predicates: `[${this.archetypeId}]`,
    }
  }
}
