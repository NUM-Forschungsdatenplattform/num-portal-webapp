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
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatFormField } from '@angular/material/form-field'
import { MatSelect, MatOption } from '@angular/material/select'
import { MatSlideToggle } from '@angular/material/slide-toggle'
import { FormsModule } from '@angular/forms'
import { AqlConnectorItemComponent } from '../aql-connector-item/aql-connector-item.component'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { TranslatePipe } from '@ngx-translate/core'
import { GroupIndexPipe } from '../../../../shared/pipes/group-index.pipe'

@Component({
  selector: 'num-aql-connector-group',
  templateUrl: './aql-connector-group.component.html',
  styleUrls: ['./aql-connector-group.component.scss'],
  imports: [
    NgClass,
    ExtendedModule,
    FaIconComponent,
    FlexModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatSlideToggle,
    FormsModule,
    AqlConnectorItemComponent,
    ButtonComponent,
    TranslatePipe,
    GroupIndexPipe,
  ],
})
export class AqlConnectorGroupComponent implements OnInit, OnChanges, OnDestroy {
  private eventSubscription: Subscription
  private targetSubscription: Subscription

  constructor(
    private cohortBuilderService: CohortBuilderService,
    private changeDetection: ChangeDetectorRef
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
      this.handleTargetReset()
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
