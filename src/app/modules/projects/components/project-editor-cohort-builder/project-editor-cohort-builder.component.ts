import { Component, Input, OnInit } from '@angular/core'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

@Component({
  selector: 'num-project-editor-cohort-builder',
  templateUrl: './project-editor-cohort-builder.component.html',
  styles: [],
})
export class ProjectEditorCohortBuilderComponent implements OnInit {
  @Input() cohortNode: CohortGroupUiModel
  @Input() isLoadingComplete: boolean
  constructor() {}

  ngOnInit(): void {}
}
