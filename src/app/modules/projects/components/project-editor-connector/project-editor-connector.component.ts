import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

@Component({
  selector: 'num-study-editor-connector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-editor-connector.component.html',
  styleUrls: ['./project-editor-connector.component.scss'],
})
export class ProjectEditorConnectorComponent implements OnInit {
  @Input() isLoadingComplete: boolean
  @Input() isDisabled: boolean
  @Input() cohortNode: CohortGroupUiModel

  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}
}
