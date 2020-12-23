import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { IContainmentTreeNode } from '../containment-tree-node.interface'
import { AqbContainsCompositionUiModel } from './aqb-contains-composition-ui.model'

export class AqbContainsUiModel {
  compositions = new Map<string, AqbContainsCompositionUiModel>()
  logicalOperator: LogicalOperator.And | LogicalOperator.Or

  constructor() {
    this.logicalOperator = LogicalOperator.And
  }

  setContains(
    templateId: string,
    compositionId: string,
    compositionReferenceId: number,
    archetypeId: string,
    archetypeReferenceId: number
  ): void {
    let composition = this.compositions.get(compositionId)
    if (composition === undefined || composition === null) {
      composition = new AqbContainsCompositionUiModel(
        templateId,
        compositionId,
        compositionReferenceId
      )
    }

    composition.setContainsItem(archetypeId, archetypeReferenceId)
    this.compositions.set(compositionId, composition)
  }
}
