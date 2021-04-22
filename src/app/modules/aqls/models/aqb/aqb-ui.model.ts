/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IAqbSelectClause } from 'src/app/shared/models/archetype-query-builder/builder-request/aqb-select-clause.interface'
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
  where = new AqbWhereGroupUiModel()
  orderBy: any

  constructor() {}

  handleElementSelect(clickEvent: IAqbSelectClick): void {
    const archetypeId = clickEvent.item.archetypeId || clickEvent.item.parentArchetypeId
    const compositionReferenceId = this.setReference(clickEvent.compositionId)
    const archetypeReferenceId = this.setReference(archetypeId)

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
      this.pushToWhereClause(clickEvent, compositionReferenceId, archetypeReferenceId)
    }

    this.contains.setContains(
      clickEvent.templateId,
      clickEvent.compositionId,
      compositionReferenceId,
      archetypeId,
      archetypeReferenceId
    )
  }

  pushToSelectClause(
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

  pushToWhereClause(
    clickEvent: IAqbSelectClick,
    compositionReferenceId: number,
    archetypeReferenceId: number
  ): void {
    if (clickEvent.item.rmType) {
      const aqbWhere = new AqbWhereItemUiModel(
        clickEvent.item,
        compositionReferenceId,
        archetypeReferenceId
      )
      this.where.children.push(aqbWhere)
    } else {
      console.log('Not possible')
    }
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

  handleDeletionByComposition(compositionIds: string[]): void {
    const referenceIds: number[] = []
    compositionIds.forEach((compositionId) => {
      referenceIds.push(this.references.get(compositionId))
      this.deleteReference(compositionId)
    })

    this.select = this.select.filter((item) => !referenceIds.includes(item.compositionReferenceId))
    this.where.handleDeletionByComposition(referenceIds)

    this.contains.deleteCompositions(referenceIds)
  }

  handleDeletionByArchetype(archetypeIds: string[]): void {
    const referenceIds: number[] = []
    archetypeIds.forEach((archetypeId) => {
      referenceIds.push(this.references.get(archetypeId))
      this.deleteReference(archetypeId)
    })

    this.select = this.select.filter((item) => !referenceIds.includes(item.archetypeReferenceId))
    this.where.handleDeletionByArchetype(referenceIds)
  }

  private deleteReference(archetypeId: string): void {
    this.references.delete(archetypeId)
  }

  convertToApi(): IArchetypeQueryBuilder {
    const select: IAqbSelectClause = {
      statement: this.select.map((selectItem) => selectItem.convertToApi()),
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
