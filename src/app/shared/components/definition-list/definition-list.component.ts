import { Component, Input, OnInit } from '@angular/core'
import { IDefinitionList } from '../../models/definition-list.interface'

@Component({
  selector: 'num-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
})
export class DefinitionListComponent implements OnInit {
  @Input() dataSource: IDefinitionList[]

  constructor() {}

  ngOnInit(): void {}
}
