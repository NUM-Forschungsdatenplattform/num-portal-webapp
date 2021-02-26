import { IAqbContainmentNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-containment-node.interface'
import { IAqbLogicalOperatorNode } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-logical-operator-node.interface'
import { AqbNodeType } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { AqbContainsCompositionUiModel } from './aqb-contains-composition-ui.model'

type PossibleContains = IAqbContainmentNode | IAqbLogicalOperatorNode<PossibleContains>
export class AqbContainsUiModel {
  compositions = new Map<number, AqbContainsCompositionUiModel>()
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
    let composition = this.compositions.get(compositionReferenceId)
    if (composition === undefined || composition === null) {
      composition = new AqbContainsCompositionUiModel(
        templateId,
        compositionId,
        compositionReferenceId
      )
    }

    composition.setContainsItem(archetypeId, archetypeReferenceId)
    this.compositions.set(compositionReferenceId, composition)
  }

  deleteCompositions(compositionReferenceIds: number[]): void {
    compositionReferenceIds.forEach((compositionReferenceId) =>
      this.compositions.delete(compositionReferenceId)
    )
  }

  convertToApi(): PossibleContains {
    const compositions = Array.from(this.compositions.values())
    if (compositions.length > 1) {
      const contains: IAqbLogicalOperatorNode<PossibleContains> = {
        _type: AqbNodeType.LogicalOperator,
        symbol: LogicalOperator.And,
        values: compositions.map((composition) => composition.convertToApi()),
      }
      return contains
    } else if (compositions.length) {
      return compositions[0].convertToApi()
    } else {
      return null
    }
  }
}
