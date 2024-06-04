import { AfterViewChecked, Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormControl } from '@angular/forms'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqbSelectClick } from '../../../../shared/models/aqb/aqb-select-click.interface'
import { AqbSelectDestination } from '../../../../shared/models/aqb/aqb-select-destination.enum'

@Component({
  selector: 'num-aql-builder-templates',
  templateUrl: './aql-builder-templates.component.html',
  styleUrls: ['./aql-builder-templates.component.scss'],
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
