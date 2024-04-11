import { Component, Input } from '@angular/core'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

@Component({
  selector: 'num-data-filter-templates',
  templateUrl: './data-filter-templates.component.html',
  styleUrls: ['./data-filter-templates.component.scss'],
})
export class DataFilterTemplatesComponent {
  @Input()
  project: ProjectUiModel

  @Input()
  totalCohortSize: number

  constructor() {}
}
