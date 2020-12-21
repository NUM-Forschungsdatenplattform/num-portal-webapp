import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { ConnectorGroupType } from 'src/app/shared/models/connector-group-type.enum'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'
import { debounce } from 'lodash-es'
import { DialogService } from 'src/app/core/services/dialog.service'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogEditPhenotypeComponent } from '../dialog-edit-phenotype/dialog-edit-phenotype.component'
import { EDIT_DIALOG_CONFIG } from './constants'
import { ADD_DIALOG_CONFIG } from './constants'
import { DialogAddPhenotypesComponent } from '../dialog-add-phenotypes/dialog-add-phenotypes.component'

@Component({
  selector: 'num-study-editor-connector-group',
  templateUrl: './study-editor-connector-group.component.html',
  styleUrls: ['./study-editor-connector-group.component.scss'],
})
export class StudyEditorConnectorGroupComponent implements OnInit, OnChanges {
  readonly connectorNodeType = ConnectorNodeType
  readonly connectorGroupType = ConnectorGroupType
  readonly logicalOperator = LogicalOperator
  readonly logicalOperatorArray = [LogicalOperator.And, LogicalOperator.Or]

  @Input() cohortGroup: CohortGroupUiModel
  @Output() chortGroupChanges = new EventEmitter<CohortGroupUiModel>()
  @Input() parentGroupIndex: number[] | null
  @Input() index: number

  @Output() delete = new EventEmitter()

  enumerateGroupsDebounced = debounce(() => this.enumerateGroups(), 100, {
    leading: true,
    trailing: false,
  })

  groupIndex: number[] = []
  groupType: string

  constructor(private dialogService: DialogService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.groupType = !this.cohortGroup.indexInGroup
      ? ConnectorGroupType.Main
      : ConnectorGroupType.Sub
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

  editPhenotype(itemIndex: number): void {
    const selectedPhenotype = this.cohortGroup.children[itemIndex] as PhenotypeUiModel
    const dialogConfig: DialogConfig = {
      ...EDIT_DIALOG_CONFIG,
      dialogContentComponent: DialogEditPhenotypeComponent,
      dialogContentPayload: selectedPhenotype,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: PhenotypeUiModel | undefined) => {
      if (confirmResult instanceof PhenotypeUiModel) {
        this.cohortGroup.children[itemIndex] = confirmResult
      } else if (confirmResult === false) {
        this.deleteChild(itemIndex)
      }
      this.changeDetectorRef.markForCheck()
    })
  }

  addPhenotype(): void {
    const dialogContentPayload: PhenotypeUiModel[] = this.cohortGroup.children.reduce(
      (phenotypes, child) => {
        if (child instanceof PhenotypeUiModel) {
          phenotypes.push(child)
        }
        return phenotypes
      },
      [] as PhenotypeUiModel[]
    )

    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddPhenotypesComponent,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: PhenotypeUiModel[] | undefined) => {
      if (Array.isArray(confirmResult)) {
        const currentGroups = this.cohortGroup.children.filter(
          (child) => child instanceof CohortGroupUiModel
        )

        this.cohortGroup.children = [...confirmResult, ...currentGroups]
      }
      this.changeDetectorRef.markForCheck()
    })
  }

  addGroup(): void {
    this.cohortGroup.children.push(new CohortGroupUiModel())
    this.enumerateGroupsDebounced()
  }

  deleteChild(index: number): void {
    this.cohortGroup.children.splice(index, 1)
    this.enumerateGroupsDebounced()
  }

  deleteSelf(): void {
    this.delete.emit(this.index)
  }
}
