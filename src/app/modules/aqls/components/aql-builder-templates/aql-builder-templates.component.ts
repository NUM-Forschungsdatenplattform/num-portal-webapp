import { AfterViewChecked, Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqbSelectClick } from '../../../../shared/models/aqb/aqb-select-click.interface'
import { AqbSelectDestination } from '../../../../shared/models/aqb/aqb-select-destination.enum'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatSelect, MatOption } from '@angular/material/select'
import { MatAccordion } from '@angular/material/expansion'
import { AqlBuilderTemplateTreeComponent } from '../aql-builder-template-tree/aql-builder-template-tree.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-aql-builder-templates',
  templateUrl: './aql-builder-templates.component.html',
  styleUrls: ['./aql-builder-templates.component.scss'],
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    ReactiveFormsModule,
    MatOption,
    MatAccordion,
    AqlBuilderTemplateTreeComponent,
    TranslatePipe,
  ],
})
export class AqlBuilderTemplatesComponent implements AfterViewChecked {
  constructor() {}

  @Input()
  templates: string[]

  @Input()
  selectedTemplates: UntypedFormControl

  @Input()
  mode: AqlBuilderDialogMode

  @Input()
  selectDestination: AqbSelectDestination

  @Output()
  selectedItem = new EventEmitter<IAqbSelectClick>()

  isViewRendered = false

  ngAfterViewChecked(): void {
    if (!this.isViewRendered) {
      setTimeout(() => {
        this.isViewRendered = true
      }, 0)
    }
  }
}
