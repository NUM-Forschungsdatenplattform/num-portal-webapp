import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { IAqbSelectFieldNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-field-node.interface'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { IContainmentTreeNode } from '../../../modules/aqls/models/containment-tree-node.interface'

export class AqbSelectItemUiModel {
  readonly type = ConnectorNodeType.Aqb_Item
  name: string
  givenName: string
  rmType: ReferenceModelType
  aqlPath: string
  humanReadablePath: string
  compositionReferenceId: number
  archetypeReferenceId: number
  isComposition: boolean
  templateId: string

  constructor(
    item: IContainmentTreeNode,
    compositionReferenceId: number,
    archetypeReferenceId: number,
    isComposition: boolean,
    templateId: string
  ) {
    this.name = item.name || item.archetypeId
    this.givenName = ''
    this.rmType = item.rmType
    this.aqlPath = item.aqlPath || ''
    this.humanReadablePath = item.humanReadablePath
    this.compositionReferenceId = compositionReferenceId
    this.archetypeReferenceId = archetypeReferenceId
    this.isComposition = isComposition
    this.templateId = templateId
  }

  convertToApi(): IAqbSelectFieldNode {
    return {
      _type: AqbNodeType.SelectField,
      aqlPath: this.aqlPath,
      containmentId: this.archetypeReferenceId,
      name: this.givenName.length
        ? this.givenName
        : this.isComposition
          ? this.templateId
          : this.name,
    }
  }
}
