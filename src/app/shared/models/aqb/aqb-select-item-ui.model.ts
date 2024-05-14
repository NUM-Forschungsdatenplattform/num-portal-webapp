import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { IAqbSelectExpressionNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-Expression-node.interface'
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

  convertToApi(): IAqbSelectExpressionNode {
    return {
      _type: AqbNodeType.SelectExpression,
      columnExpression: {
        _type: AqbNodeType.IdentifiedPath,
        root: {
          _type: 'Containment',
          identifier: `${this.isComposition ? 'c' : 'o'}${this.archetypeReferenceId}${this.aqlPath}`,
        },
      },
      ...(this.givenName && { alias: this.givenName }),
    }
  }
}
