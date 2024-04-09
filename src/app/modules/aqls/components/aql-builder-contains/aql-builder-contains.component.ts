import { Component, Input } from '@angular/core'
import { AqbContainsCompositionUiModel } from '../../../../shared/models/aqb/aqb-contains-composition-ui.model'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'

@Component({
  selector: 'num-aql-builder-contains',
  templateUrl: './aql-builder-contains.component.html',
  styleUrls: ['./aql-builder-contains.component.scss'],
})
export class AqlBuilderContainsComponent {
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  @Input()
  compositions: AqbContainsCompositionUiModel[] = []

  deleteCompositionByReferenceId(compositionReferenceId: number): void {
    this.aqbModel.handleDeletionByCompositionReferenceIds([compositionReferenceId])
    this.compositions = this.compositions.filter(
      (composition) => composition.compositionReferenceId !== compositionReferenceId
    )
  }

  deleteArchetypesByReferenceIds(archetypeReferenceIds: number[]): void {
    this.aqbModel.handleDeletionByArchetypeReferenceIds(archetypeReferenceIds)
  }
}
