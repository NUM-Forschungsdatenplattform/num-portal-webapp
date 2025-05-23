import { Component, Input } from '@angular/core'

import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion'
import { FlexModule } from '@angular/flex-layout/flex'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { AddTemplatesComponent } from '../add-templates/add-templates.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-project-editor-templates',
  templateUrl: './project-editor-templates.component.html',
  styleUrls: ['./project-editor-templates.component.scss'],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    FlexModule,
    FaIconComponent,
    AddTemplatesComponent,
    TranslatePipe,
  ],
})
export class ProjectEditorTemplatesComponent {
  constructor() {}

  @Input() isDisabled: boolean
  @Input() project: ProjectUiModel
}
