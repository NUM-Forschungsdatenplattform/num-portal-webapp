import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determineHits.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'

@Component({
  selector: 'num-study-editor-connector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './study-editor-connector.component.html',
  styleUrls: ['./study-editor-connector.component.scss'],
})
export class StudyEditorConnectorComponent implements OnInit {
  @Input() isLoadingComplete: boolean
  @Input() isDisabled: boolean
  @Input() cohortNode: CohortGroupUiModel

  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}
}
