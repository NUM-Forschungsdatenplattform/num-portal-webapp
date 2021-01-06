import { Component, Input, OnInit } from '@angular/core'
import { AqbContainsCompositionUiModel } from '../../models/aqb/aqb-contains-composition-ui.model'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

@Component({
  selector: 'num-aql-builder-contains',
  templateUrl: './aql-builder-contains.component.html',
  styleUrls: ['./aql-builder-contains.component.scss'],
})
export class AqlBuilderContainsComponent implements OnInit {
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  @Input()
  compositions: AqbContainsCompositionUiModel[] = []

  ngOnInit(): void {}

  deleteComposition(compositionId: string): void {
    this.aqbModel.handleDeletionByComposition([compositionId])
    this.compositions = this.compositions.filter(
      (composition) => composition.compositionId !== compositionId
    )
  }

  deleteArchetypes(archetypeIds: string[]): void {
    this.aqbModel.handleDeletionByArchetype(archetypeIds)
  }
}
