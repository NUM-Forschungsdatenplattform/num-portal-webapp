import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'
import { IAqbSelectClick } from '../../models/aqb/aqb-select-click.interface'

@Component({
  selector: 'num-aql-builder-templates',
  templateUrl: './aql-builder-templates.component.html',
  styleUrls: ['./aql-builder-templates.component.scss'],
})
export class AqlBuilderTemplatesComponent implements OnInit {
  constructor() {}

  @Input()
  templates: IEhrbaseTemplate[]

  @Input()
  selectedTemplates: FormControl

  @Output()
  selectedItem = new EventEmitter<IAqbSelectClick>()

  ngOnInit(): void {}
}
