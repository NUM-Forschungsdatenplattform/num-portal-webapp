import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { AqbContainsCompositionUiModel } from '../../models/aqb/aqb-contains-composition-ui.model'
import { AqbContainsUiModel } from '../../models/aqb/aqb-contains-ui.model'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

@Component({
  selector: 'num-aql-builder-contains',
  templateUrl: './aql-builder-contains.component.html',
  styleUrls: ['./aql-builder-contains.component.scss'],
})
export class AqlBuilderContainsComponent implements OnInit, OnChanges {
  constructor() {}

  @Input()
  compositions: AqbContainsCompositionUiModel[] = []

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'contains': {
          }
        }
      }
    }
  }

  deleteChild(event: any): void {
    console.log('To be deleted: ', event)
  }
}
