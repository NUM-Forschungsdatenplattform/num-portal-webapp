import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'

@Component({
  selector: 'num-study-editor-connector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './study-editor-connector.component.html',
  styleUrls: ['./study-editor-connector.component.scss'],
})
export class StudyEditorConnectorComponent implements OnInit {
  @Input() cohortNode: CohortGroupUiModel
  constructor() {}

  ngOnInit(): void {}
}
