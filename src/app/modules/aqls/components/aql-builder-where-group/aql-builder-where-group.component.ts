import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { debounce } from 'lodash-es'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { AqbWhereGroupUiModel } from '../../../../shared/models/aqb/aqb-where-group-ui.model'

@Component({
  selector: 'num-aql-builder-where-group',
  templateUrl: './aql-builder-where-group.component.html',
  styleUrls: ['./aql-builder-where-group.component.scss'],
})
export class AqlBuilderWhereGroupComponent implements OnInit, OnChanges {
  readonly aqlBuilderDialogMode = AqlBuilderDialogMode
  readonly connectorNodeType = ConnectorNodeType
  readonly connectorGroupType = ConnectorGroupType
  readonly logicalOperator = LogicalOperator
  readonly logicalOperatorArray = [LogicalOperator.And, LogicalOperator.Or]
  constructor() {}

  @Input()
  dialogMode: AqlBuilderDialogMode = AqlBuilderDialogMode.Criteria

  @Input() group: AqbWhereGroupUiModel

  @Input() parentGroupIndex: number[] | null
  @Input() index: number

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
      if (Object.prototype.hasOwnProperty.call(changes, propName)) {
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
      if (child instanceof AqbWhereGroupUiModel) {
        child.indexInGroup = counter
        counter++
      }
    })
  }

  addGroup(): void {
    this.group.children.push(new AqbWhereGroupUiModel())
    this.enumerateGroupsDebounced()
  }

  deleteChildGroup(_index: number): void {
    this.enumerateGroupsDebounced()
  }

  deleteChildItem(index: number, _archetypeId: string): void {
    this.group.children.splice(index, 1)
  }

  deleteSelf(): void {
    console.log('TODO: Deleting of groups')
  }
}
