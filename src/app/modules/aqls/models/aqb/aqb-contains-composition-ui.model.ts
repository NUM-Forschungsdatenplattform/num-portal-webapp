import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { IContainmentTreeNode } from '../containment-tree-node.interface'
import { AqbContainsGroupUiModel } from './aqb-contains-group-ui.model'
import { AqbContainsItemUiModel } from './aqb-contains-item-ui.model'

export class AqbContainsCompositionUiModel {
  type = ConnectorNodeType.Aqb_Composition
  indexInGroup: number | null = null
  existingItems = new Map<string, boolean>()
  logicalOperator: LogicalOperator.And | LogicalOperator.Or
  children: (AqbContainsItemUiModel | AqbContainsGroupUiModel)[]
  templateId: string
  compositionId: string
  compositionReferenceId: number

  constructor(templateId: string, compositionId: string, compositionReferenceId: number) {
    this.logicalOperator = LogicalOperator.And
    this.children = []
    this.templateId = templateId
    this.compositionId = compositionId
    this.compositionReferenceId = compositionReferenceId
  }

  setContainsItem(archetypeId: string, archetypeReferenceId: number): void {
    const isExisting = !!this.existingItems.get(archetypeId)
    console.log(isExisting)
    if (!isExisting && archetypeId !== this.compositionId) {
      const containsItem = new AqbContainsItemUiModel(
        this.compositionId,
        this.compositionReferenceId,
        archetypeId,
        archetypeReferenceId
      )
      this.children.push(containsItem)
      this.existingItems.set(archetypeId, true)
    }
  }
}
