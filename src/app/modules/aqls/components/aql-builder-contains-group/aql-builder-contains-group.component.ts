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
import { AqbContainsGroupUiModel } from '../../../../shared/models/aqb/aqb-contains-group-ui.model'
import { debounce } from 'lodash-es'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { AqbContainsCompositionUiModel } from '../../../../shared/models/aqb/aqb-contains-composition-ui.model'

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

  @Output() delete = new EventEmitter<number>()
  @Output() deleteArchetypesByReferenceIds = new EventEmitter<number[]>()
  @Output() deleteCompositionByReferenceId = new EventEmitter<number>()

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

  deleteChildGroup(index: number): void {
    const deletedGroup = this.group.children.splice(index, 1)[0] as AqbContainsGroupUiModel
    const archetypeReferenceIds = deletedGroup.collectArchetypeReferenceIds([])
    this.deleteArchetypesByReferenceIds.emit(archetypeReferenceIds)
    this.enumerateGroupsDebounced()
  }

  deleteChildItem(index: number, archetypeReferenceId: number): void {
    this.group.children.splice(index, 1)
    this.deleteArchetypesByReferenceIds.emit([archetypeReferenceId])
  }

  deleteSelf(): void {
    if (this.group instanceof AqbContainsCompositionUiModel) {
      this.deleteCompositionByReferenceId.emit(this.group.compositionReferenceId)
    } else {
      this.delete.emit(this.index)
    }
  }
}
