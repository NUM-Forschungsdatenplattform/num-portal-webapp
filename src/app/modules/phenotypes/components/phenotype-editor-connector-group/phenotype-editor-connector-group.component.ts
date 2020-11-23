import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { LogicalOperator } from 'src/app/shared/models/logical-operator.enum'

import { debounce } from 'lodash-es'
import { ConnectorGroupType } from '../../../../shared/models/connector-group-type.enum'
import { DialogService } from 'src/app/core/services/dialog.service'
import { DialogAddAqlsComponent } from '../dialog-add-aqls/dialog-add-aqls.component'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { DialogEditAqlComponent } from '../dialog-edit-aql/dialog-edit-aql.component'
import { ADD_DIALOG_CONFIG, EDIT_DIALOG_CONFIG } from './constants'
import { ConnectorNodeType } from 'src/app/shared/models/connector-node-type.enum'

@Component({
  selector: 'num-phenotype-editor-connector-group',
  templateUrl: './phenotype-editor-connector-group.component.html',
  styleUrls: ['./phenotype-editor-connector-group.component.scss'],
})
export class PhenotypeEditorConnectorGroupComponent implements OnInit, OnChanges {
  readonly connectorNodeType = ConnectorNodeType
  readonly connectorGroupType = ConnectorGroupType
  readonly logicalOperator = LogicalOperator
  readonly logicalOperatorArray = [LogicalOperator.And, LogicalOperator.Or]

  @Input() phenotypeGroup: PhenotypeGroupUiModel
  @Input() parentGroupIndex: number[] | null
  @Input() index: number

  @Output() delete = new EventEmitter()

  enumerateGroupsDebounced = debounce(() => this.enumerateGroups(), 100, {
    leading: true,
    trailing: false,
  })

  groupIndex: number[] = []
  groupType: string

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.groupType = !this.phenotypeGroup.indexInGroup
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
    if (this.phenotypeGroup.indexInGroup !== null) {
      this.groupIndex.push(this.phenotypeGroup.indexInGroup)
    }

    let counter = 1

    this.phenotypeGroup.children.forEach((child) => {
      if (child instanceof PhenotypeGroupUiModel) {
        child.indexInGroup = counter
        counter++
      }
    })
  }

  editQuery(itemIndex: number): void {
    const selectedAql = this.phenotypeGroup.children[itemIndex] as AqlUiModel
    const dialogConfig: DialogConfig = {
      ...EDIT_DIALOG_CONFIG,
      dialogContentComponent: DialogEditAqlComponent,
      dialogContentPayload: selectedAql,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: AqlUiModel | undefined) => {
      if (confirmResult instanceof AqlUiModel) {
        this.phenotypeGroup.children[itemIndex] = confirmResult
      } else if (confirmResult === false) {
        this.deleteChild(itemIndex)
      }
    })
  }

  addQuery(): void {
    const dialogContentPayload: AqlUiModel[] = this.phenotypeGroup.children.reduce(
      (aqls, child) => {
        if (child instanceof AqlUiModel) {
          aqls.push(child)
        }
        return aqls
      },
      [] as AqlUiModel[]
    )

    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddAqlsComponent,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: AqlUiModel[] | undefined) => {
      if (Array.isArray(confirmResult)) {
        const currentGroups = this.phenotypeGroup.children.filter(
          (child) => child instanceof PhenotypeGroupUiModel
        )

        this.phenotypeGroup.children = [...confirmResult, ...currentGroups]
      }
    })
  }

  addGroup(): void {
    this.phenotypeGroup.children.push(new PhenotypeGroupUiModel())
    this.enumerateGroupsDebounced()
  }

  deleteChild(index: number): void {
    this.phenotypeGroup.children.splice(index, 1)
    this.enumerateGroupsDebounced()
  }

  deleteSelf(): void {
    this.delete.emit(this.index)
  }
}
