import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { AqbContainsGroupUiModel } from '../../models/aqb/aqb-contains-group-ui.model'
import { debounce } from 'lodash-es'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { AqbContainsCompositionUiModel } from '../../models/aqb/aqb-contains-composition-ui.model'

@Component({
  selector: 'num-aql-builder-contains-group',
  templateUrl: './aql-builder-contains-group.component.html',
  styleUrls: ['./aql-builder-contains-group.component.scss'],
})
export class AqlBuilderContainsGroupComponent implements OnInit, OnChanges {
  readonly connectorNodeType = ConnectorNodeType
  readonly connectorGroupType = ConnectorGroupType
  readonly logicalOperator = LogicalOperator
  readonly logicalOperatorArray = [LogicalOperator.And, LogicalOperator.Or]

  constructor() {}

  @Input() group: AqbContainsGroupUiModel | AqbContainsCompositionUiModel

  @Input() parentGroupIndex: number[] | null
  @Input() index: number

  @Output() delete = new EventEmitter()

  enumerateGroupsDebounced = debounce(() => this.enumerateGroups(), 100, {
    leading: true,
    trailing: false,
  })

  groupIndex: number[] = []
  groupType: ConnectorGroupType

  ngOnInit(): void {
    this.groupType = !this.group.indexInGroup ? ConnectorGroupType.Main : ConnectorGroupType.Sub
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'parentGroupIndex': {
            this.enumerateGroupsDebounced()
          }
        }
      }
    }
  }

  enumerateGroups(): void {
    this.groupIndex = [...(this.parentGroupIndex ? this.parentGroupIndex : [])]
    if (this.group.indexInGroup !== null) {
      this.groupIndex.push(this.group.indexInGroup)
    }

    let counter = 1

    this.group.children.forEach((child) => {
      if (child instanceof AqbContainsGroupUiModel) {
        child.indexInGroup = counter
        counter++
      }
    })
  }

  addGroup(): void {
    this.group.children.push(new AqbContainsGroupUiModel())
    this.enumerateGroupsDebounced()
  }

  deleteChild(index: number): void {
    this.group.children.splice(index, 1)
    this.enumerateGroupsDebounced()
  }

  deleteSelf(): void {
    console.log('TODO: Group deletion should clear references')
    // this.delete.emit(this.index)
  }
}
