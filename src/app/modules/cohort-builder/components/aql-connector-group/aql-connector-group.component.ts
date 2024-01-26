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

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { debounce } from 'lodash-es'
import { Subscription } from 'rxjs'
import { CohortBuilderService } from 'src/app/core/services/cohort-builder/cohort-builder.service'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

@Component({
  selector: 'num-aql-connector-group',
  templateUrl: './aql-connector-group.component.html',
  styleUrls: ['./aql-connector-group.component.scss'],
})
export class AqlConnectorGroupComponent implements OnInit, OnChanges, OnDestroy {
  private eventSubscription: Subscription
  private targetSubscription: Subscription

  constructor(
    private cohortBuilderService: CohortBuilderService,
    private changeDetection: ChangeDetectorRef,
  ) {}

  readonly connectorNodeType = ConnectorNodeType
  readonly connectorGroupType = ConnectorGroupType
  readonly logicalOperator = LogicalOperator
  readonly logicalOperatorArray = [LogicalOperator.And, LogicalOperator.Or]

  subscriptions = new Subscription()

  @Input() cohortGroup: CohortGroupUiModel
  @Output() chortGroupChanges = new EventEmitter<CohortGroupUiModel>()
  @Input() parentGroupIndex: number[] | null
  @Input() index: number
  @Input() isDisabled: boolean

  @Output() delete = new EventEmitter()

  enumerateGroupsDebounced = debounce(() => this.enumerateGroups(), 100, {
    leading: true,
    trailing: false,
  })

  groupIndex: number[] = []
  groupType: string
  isActive = false
  isActiveSetting: boolean

  ngOnInit(): void {
    this.groupType = !this.cohortGroup.indexInGroup
      ? ConnectorGroupType.Main
      : ConnectorGroupType.Sub

    if (this.groupType === ConnectorGroupType.Main) {
      this.isActive = true
    }

    if (this.isActive) {
      this.addEventSubscription()
    }

    this.targetSubscription = this.cohortBuilderService.targetResetObservable$.subscribe(() =>
      this.handleTargetReset(),
    )

    if (this.cohortGroup.addedByClick) {
      this.setDestination()
    }
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

  ngOnDestroy(): void {
    this.removeEventSubscription()
    this.targetSubscription.unsubscribe()
  }

  addEventSubscription(): void {
    if (!this.eventSubscription || this.eventSubscription.closed) {
      this.eventSubscription = this.cohortBuilderService.itemEventObservable$.subscribe((aql) => {
        this.cohortGroup.children.push(aql)
      })
    }
  }

  removeEventSubscription(): void {
    this.eventSubscription?.unsubscribe()
  }

  handleTargetReset(): void {
    let shouldDetectChanges = false
    if (this.isActiveSetting) {
      this.isActiveSetting = false
    } else {
      if (this.isActive) {
        shouldDetectChanges = true
      }
      this.isActive = false
      if (shouldDetectChanges) {
        this.changeDetection.detectChanges()
      }
      this.removeEventSubscription()
    }
  }

  setDestination(): void {
    this.isActiveSetting = true
    this.isActive = true
    this.cohortBuilderService.resetTargets()
    this.addEventSubscription()
  }

  enumerateGroups(): void {
    this.groupIndex = [...(this.parentGroupIndex ? this.parentGroupIndex : [])]
    if (this.cohortGroup.indexInGroup !== null) {
      this.groupIndex.push(this.cohortGroup.indexInGroup)
    }

    let counter = 1

    this.cohortGroup.children.forEach((child) => {
      if (child instanceof CohortGroupUiModel) {
        child.indexInGroup = counter
        counter++
      }
    })
  }

  addGroup(): void {
    this.cohortGroup.children.push(new CohortGroupUiModel(true))
    this.enumerateGroupsDebounced()
  }

  deleteChildItem(index: number): void {
    this.cohortGroup.children.splice(index, 1)
  }

  deleteChildGroup(wasActive: boolean, index: number): void {
    this.cohortGroup.children.splice(index, 1)
    if (wasActive) {
      this.setDestination()
    }
    this.enumerateGroupsDebounced()
  }

  deleteSelf(): void {
    this.delete.emit(this.isActive)
  }
}
