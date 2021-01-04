import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IAqbSelectClause } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-clause.interface'
import { AqbContainsUiModel } from './aqb-contains-ui.model'
import { IAqbSelectClick } from './aqb-select-click.interface'
import { AqbSelectItemUiModel } from './aqb-select-item-ui.model'

export class AqbUiModel {
  private referenceCounter = 0
  private references = new Map<string, number>()

  ehr: any
  select: AqbSelectItemUiModel[] = []
  contains = new AqbContainsUiModel()
  where: any
  orderBy: any

  constructor() {}

  handleElementSelect(clickEvent: IAqbSelectClick): void {
    const archetypeId = clickEvent.item.archetypeId || clickEvent.item.parentArchetypeId
    const compositionReferenceId = this.setReference(clickEvent.compositionId)
    const archetypeReferenceId = this.setReference(archetypeId)
    const aqbSelect = new AqbSelectItemUiModel(
      clickEvent.item,
      compositionReferenceId,
      archetypeReferenceId
    )
    this.select.push(aqbSelect)
    this.contains.setContains(
      clickEvent.templateId,
      clickEvent.compositionId,
      compositionReferenceId,
      archetypeId,
      archetypeReferenceId
    )
    console.log(this)
  }

  setReference(archetypeId: string): number {
    const reference = this.references.get(archetypeId)
    if (reference !== null && reference !== undefined) {
      return reference
    }
    this.referenceCounter++
    this.references.set(archetypeId, this.referenceCounter)

    return this.referenceCounter
  }

  deleteReference(archetypeId: string): void {
    delete this.references[archetypeId]
  }

  convertToApi(): IArchetypeQueryBuilder {
    const select: IAqbSelectClause = {
      statement: this.select.map((selectItem) => selectItem.convertToApi()),
    }

    const contains = this.contains.convertToApi()

    return {
      select,
      contains,
    }
  }
}
