import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { IAqbSelectFieldNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-field-node.interface'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IContainmentTreeNode } from '../containment-tree-node.interface'

export class AqbSelectItemUiModel {
  readonly type = ConnectorNodeType.Aqb_Item
  name: string
  givenName: string
  rmType: ReferenceModelType
  aqlPath: string
  humanReadablePath: string
  compositionReferenceId: number
  archetypeReferenceId: number

  constructor(
    item: IContainmentTreeNode,
    compositionReferenceId: number,
    archetypeReferenceId: number
  ) {
    this.name = item.name || item.archetypeId
    this.givenName = item.name || item.archetypeId
    this.rmType = item.rmType
    this.aqlPath = item.aqlPath || ''
    this.humanReadablePath = item.humanReadablePath
    this.compositionReferenceId = compositionReferenceId
    this.archetypeReferenceId = archetypeReferenceId
  }

  convertToApi(): IAqbSelectFieldNode {
    return {
      _type: AqbNodeType.SelectField,
      aqlPath: this.aqlPath,
      containmentId: this.archetypeReferenceId,
      name: this.givenName,
    }
  }
}
