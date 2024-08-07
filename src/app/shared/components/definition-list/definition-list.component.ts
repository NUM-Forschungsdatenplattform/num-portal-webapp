import { Component, Input } from '@angular/core'
import { IDefinitionList } from '../../models/definition-list.interface'
import { DefinitionType } from '../../models/definition-type.enum'

@Component({
  selector: 'num-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
})
export class DefinitionListComponent {
  @Input() dataSource: IDefinitionList[]
  definitionType = DefinitionType

  constructor() {}
}
