import { Component, Input } from '@angular/core'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { MatCard } from '@angular/material/card'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { AddTemplatesComponent } from '../../../projects/components/add-templates/add-templates.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-data-filter-templates',
  templateUrl: './data-filter-templates.component.html',
  styleUrls: ['./data-filter-templates.component.scss'],
  imports: [MatCard, NgClass, ExtendedModule, AddTemplatesComponent, TranslatePipe],
})
export class DataFilterTemplatesComponent {
  @Input()
  project: ProjectUiModel

  @Input()
  totalCohortSize: number

  constructor() {}
}
