import { IAqbContainmentNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-containment-node.interface'
import { IAqbLogicalOperatorNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-logical-operator-node.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { AqbContainsGroupUiModel } from './aqb-contains-group-ui.model'
import { AqbContainsItemUiModel } from './aqb-contains-item-ui.model'

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>
export class AqbContainsCompositionUiModel {
  type = ConnectorNodeType.Aqb_Composition
  indexInGroup: number | null = null
  existingItems = new Map<number, boolean>()
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  children: (AqbContainsItemUiModel | AqbContainsGroupUiModel)[]
  templateId: string
  compositionId: string
  compositionReferenceId: number
  archetypeReferenceId: number

  constructor(templateId: string, compositionId: string, compositionReferenceId: number) {
    this.logicalOperator = LogicalOperator.And
    this.children = []
    this.templateId = templateId
    this.compositionId = compositionId
    this.compositionReferenceId = compositionReferenceId
    this.archetypeReferenceId = compositionReferenceId
  }

  setContainsItem(archetypeId: string, archetypeReferenceId: number): void {
    const isExisting = !!this.existingItems.get(archetypeReferenceId)
    if (!isExisting && archetypeId !== this.compositionId) {
      const containsItem = new AqbContainsItemUiModel(
        this.compositionId,
        this.compositionReferenceId,
        archetypeId,
        archetypeReferenceId
      )
      this.children.push(containsItem)
      this.existingItems.set(archetypeReferenceId, true)
    }
  }

  convertToApi(): IAqbContainmentNode {
    let subContains: PossibleContains
    if (this.children.length === 1) {
      subContains = this.children[0].convertToApi()
    } else if (this.children.length > 1) {
      subContains = {
        _type: AqbNodeType.LogicalOperator,
        symbol: this.logicalOperator,
        values: this.children.map((child) => child.convertToApi()),
      }
    }
    return {
      _type: AqbNodeType.Containment,
      type: 'COMPOSITION',
      identifier: `c${this.archetypeReferenceId}`,
      predicates: `[${this.compositionId}]`,
      contains: subContains,
    }
  }
}
