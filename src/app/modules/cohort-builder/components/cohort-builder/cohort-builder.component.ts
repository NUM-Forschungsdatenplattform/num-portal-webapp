import { Component, Input } from '@angular/core'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { FlexModule } from '@angular/flex-layout/flex'
import { AqlSelectionComponent } from '../aql-selection/aql-selection.component'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { AqlConnectorGroupComponent } from '../aql-connector-group/aql-connector-group.component'

@Component({
  selector: 'num-cohort-builder',
  templateUrl: './cohort-builder.component.html',
  styleUrls: ['./cohort-builder.component.scss'],
  imports: [FlexModule, AqlSelectionComponent, NgClass, ExtendedModule, AqlConnectorGroupComponent],
})
export class CohortBuilderComponent {
  @Input() cohortNode: CohortGroupUiModel
  @Input() isLoadingComplete: boolean
  @Input() raised: boolean
  @Input() isDisabled: boolean

  constructor() {}
}
