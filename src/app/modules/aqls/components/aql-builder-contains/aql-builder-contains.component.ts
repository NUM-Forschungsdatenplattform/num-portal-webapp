import { Component, Input, OnInit } from '@angular/core'
import { AqbContainsCompositionUiModel } from '../../models/aqb/aqb-contains-composition-ui.model'

@Component({
  selector: 'num-aql-builder-contains',
  templateUrl: './aql-builder-contains.component.html',
  styleUrls: ['./aql-builder-contains.component.scss'],
})
export class AqlBuilderContainsComponent implements OnInit {
  constructor() {}

  @Input()
  compositions: AqbContainsCompositionUiModel[] = []

  ngOnInit(): void {}

  deleteChild(event: any): void {
    console.log('To be deleted: ', event)
  }
}
