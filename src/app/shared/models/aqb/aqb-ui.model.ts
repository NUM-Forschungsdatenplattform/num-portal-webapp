import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IAqbSelectClause } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-clause.interface'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IContainmentTreeNode } from '../../../modules/aqls/models/containment-tree-node.interface'
import { AqbContainsUiModel } from './aqb-contains-ui.model'
import { IAqbSelectClick } from './aqb-select-click.interface'
import { AqbSelectDestination } from './aqb-select-destination.enum'
import { AqbSelectItemUiModel } from './aqb-select-item-ui.model'
import { AqbWhereGroupUiModel } from './aqb-where-group-ui.model'
import { AqbWhereItemUiModel } from './aqb-where-item-ui.model'

export class AqbUiModel {
  private referenceCounter = 0
  private references = new Map<string, number>()

  selectDestination = AqbSelectDestination.Select

  ehr: any
  select: AqbSelectItemUiModel[] = []
  contains = new AqbContainsUiModel()
  /** First group for template restriction, second for user-generated conditions */
  where = new AqbWhereGroupUiModel(true)
  orderBy: any

  constructor() {}

  handleElementSelect(clickEvent: IAqbSelectClick): void {
    const archetypeId = clickEvent.item.archetypeId || clickEvent.item.parentArchetypeId
    const compositionReferenceKey = clickEvent.templateId + '--' + clickEvent.compositionId
    const archetypeReferenceKey = clickEvent.templateId + '--' + archetypeId
    const isExistingComposition = !!this.references.get(compositionReferenceKey)

    const compositionReferenceId = this.setReference(compositionReferenceKey)
    const archetypeReferenceId = this.setReference(archetypeReferenceKey)

    if (!isExistingComposition) {
      this.addTemplateRestriction(
        compositionReferenceId,
        clickEvent.compositionId,
        clickEvent.templateId
      )
    }

    if (this.selectDestination === AqbSelectDestination.Select) {
      const isComposition = clickEvent.compositionId === clickEvent.item.archetypeId
      this.pushToSelectClause(
        clickEvent,
        compositionReferenceId,
        archetypeReferenceId,
        isComposition,
        clickEvent.templateId
      )
    } else {
      const userGeneratedWhereClause = this.where.children[1] as AqbWhereGroupUiModel
      this.pushToWhereClause(
        userGeneratedWhereClause,
        clickEvent,
        compositionReferenceId,
        archetypeReferenceId
      )
    }

    this.contains.setContains(
      clickEvent.templateId,
      clickEvent.compositionId,
      compositionReferenceId,
      archetypeId,
      archetypeReferenceId
    )
  }

  private addTemplateRestriction(
    compositionReferenceId: number,
    compositionId: string,
    templateId: string
  ): void {
    const templateRestrictionItem: IContainmentTreeNode = {
      displayName: 'Template ID',
      name: 'Template ID',
      aqlPath: '/archetype_details/template_id/value',
      archetypeId: compositionId,
      rmType: ReferenceModelType.String,
    }

    const templateRestrictionWhereClause = this.where.children[0] as AqbWhereGroupUiModel
    const aqbWhere = new AqbWhereItemUiModel(
      templateRestrictionItem,
      compositionReferenceId,
      compositionReferenceId
    )

    aqbWhere.value = templateId

    templateRestrictionWhereClause.children.push(aqbWhere)
  }

  private pushToSelectClause(
    clickEvent: IAqbSelectClick,
    compositionReferenceId: number,
    archetypeReferenceId: number,
    isComposition: boolean,
    templateId: string
  ): void {
    const aqbSelect = new AqbSelectItemUiModel(
      clickEvent.item,
      compositionReferenceId,
      archetypeReferenceId,
      isComposition,
      templateId
    )
    this.select.push(aqbSelect)
  }

  private pushToWhereClause(
    whereGroup: AqbWhereGroupUiModel,
    clickEvent: IAqbSelectClick,
    compositionReferenceId: number,
    archetypeReferenceId: number
  ): void {
    const aqbWhere = new AqbWhereItemUiModel(
      clickEvent.item,
      compositionReferenceId,
      archetypeReferenceId
    )

    whereGroup.children.push(aqbWhere)
  }

  private setReference(archetypeId: string): number {
    const reference = this.references.get(archetypeId)
    if (reference !== null && reference !== undefined) {
      return reference
    }
    this.referenceCounter++
    this.references.set(archetypeId, this.referenceCounter)

    return this.referenceCounter
  }

  handleDeletionByCompositionReferenceIds(compositionReferenceIds: number[]): void {
    this.deleteReferencesByIds(compositionReferenceIds)

    this.select = this.select.filter(
      (item) => !compositionReferenceIds.includes(item.compositionReferenceId)
    )

    const templateRestrictionWhereClause = this.where.children[0] as AqbWhereGroupUiModel
    const userGeneratedWhereClause = this.where.children[1] as AqbWhereGroupUiModel

    templateRestrictionWhereClause?.handleDeletionByComposition(compositionReferenceIds)
    userGeneratedWhereClause?.handleDeletionByComposition(compositionReferenceIds)

    this.contains.deleteCompositions(compositionReferenceIds)
  }

  handleDeletionByArchetypeReferenceIds(archetypeReferenceIds: number[]): void {
    this.deleteReferencesByIds(archetypeReferenceIds)

    this.select = this.select.filter(
      (item) => !archetypeReferenceIds.includes(item.archetypeReferenceId)
    )

    const userGeneratedWhereClause = this.where.children[1] as AqbWhereGroupUiModel
    userGeneratedWhereClause?.handleDeletionByArchetype(archetypeReferenceIds)
  }

  private deleteReferencesByIds(archetypeReferenceIds: number[]): void {
    this.references.forEach((mappedReferenceId, archetype) => {
      if (archetypeReferenceIds.includes(mappedReferenceId)) {
        this.deleteReference(archetype)
      }
    })
  }

  private deleteReference(archetypeId: string): void {
    this.references.delete(archetypeId)
  }

  convertToApi(): IArchetypeQueryBuilder {
    const uniqueSelectAliasCounter = new Map<string, number>()
    const select: IAqbSelectClause = {
      statement: this.select.map((selectItem) => {
        const convertedSelectItem = selectItem.convertToApi()
        let aliasCount = uniqueSelectAliasCounter.get(convertedSelectItem.name)

        if (aliasCount++) {
          uniqueSelectAliasCounter.set(convertedSelectItem.name, aliasCount)
          convertedSelectItem.name = `${convertedSelectItem.name}_${aliasCount}`
        } else {
          uniqueSelectAliasCounter.set(convertedSelectItem.name, 1)
        }
        return convertedSelectItem
      }),
    }

    const contains = this.contains.convertToApi()
    const where = this.where.convertToApi()

    return {
      select,
      contains,
      where,
    }
  }
}
