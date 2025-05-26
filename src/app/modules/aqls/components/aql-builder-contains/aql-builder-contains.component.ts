import { Component, Input } from '@angular/core'
import { AqbContainsCompositionUiModel } from '../../../../shared/models/aqb/aqb-contains-composition-ui.model'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'
import { FlexModule } from '@angular/flex-layout/flex'
import { AqlBuilderContainsGroupComponent } from '../aql-builder-contains-group/aql-builder-contains-group.component'

@Component({
  selector: 'num-aql-builder-contains',
  templateUrl: './aql-builder-contains.component.html',
  styleUrls: ['./aql-builder-contains.component.scss'],
  imports: [FlexModule, AqlBuilderContainsGroupComponent],
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
