import { Component, Input, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IEhrbaseTemplate } from 'src/app/shared/models/archetype-query-builder/template/ehrbase-template.interface'

@Component({
  selector: 'num-aql-builder-templates',
  templateUrl: './aql-builder-templates.component.html',
  styleUrls: ['./aql-builder-templates.component.scss'],
})
export class AqlBuilderTemplatesComponent implements OnInit {
  @Input()
  templates: IEhrbaseTemplate[]

  @Input()
  selectedTemplates: FormControl
  constructor() {}

  ngOnInit(): void {}
}
