import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IAqbSelectClick } from '../../models/aqb/aqb-select-click.interface'

@Component({
  selector: 'num-aql-builder-templates',
  templateUrl: './aql-builder-templates.component.html',
  styleUrls: ['./aql-builder-templates.component.scss'],
})
export class AqlBuilderTemplatesComponent implements OnInit, AfterViewChecked {
  constructor() {}

  @Input()
  templates: string[]

  @Input()
  selectedTemplates: FormControl

  @Output()
  selectedItem = new EventEmitter<IAqbSelectClick>()

  isViewRendered = false

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.isViewRendered = true
    }, 0)
  }
}
