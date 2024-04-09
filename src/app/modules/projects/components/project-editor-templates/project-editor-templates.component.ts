import { Component, Input } from '@angular/core'

import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

@Component({
  selector: 'num-project-editor-templates',
  templateUrl: './project-editor-templates.component.html',
  styleUrls: ['./project-editor-templates.component.scss'],
})
export class ProjectEditorTemplatesComponent {
  constructor() {}

  @Input() isDisabled: boolean
  @Input() project: ProjectUiModel
}
