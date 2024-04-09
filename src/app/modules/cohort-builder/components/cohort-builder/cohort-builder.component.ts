import { Component, Input } from '@angular/core'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

@Component({
  selector: 'num-cohort-builder',
  templateUrl: './cohort-builder.component.html',
  styleUrls: ['./cohort-builder.component.scss'],
})
export class CohortBuilderComponent {
  @Input() cohortNode: CohortGroupUiModel
  @Input() isLoadingComplete: boolean
  @Input() raised: boolean
  @Input() isDisabled: boolean

  constructor() {}
}
