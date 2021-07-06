/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  dialogMode: AqlBuilderDialogMode = AqlBuilderDialogMode.AqlEditor

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

  deleteChildGroup(index: number): void {
    this.enumerateGroupsDebounced()
  }

  deleteChildItem(index: number, archetypeId: string): void {
    this.group.children.splice(index, 1)
  }

  deleteSelf(): void {
    console.log('TODO: Deleting of groups')
  }
}
