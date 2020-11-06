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
import { PhenotypeQueryType } from 'src/app/shared/models/phenotype/phenotype-query-type.enum'
//import { IPhenotypeQuery } from '../../../../shared/models/phenotype/phenotype-query.interface'

import debounce from 'lodash-es/debounce'
import { PhenotypeGroupType } from '../../../../shared/models/phenotype/phenotype-group-type.enum'
import { DialogService } from 'src/app/core/services/dialog.service'
import { DialogAddAqlsComponent } from '../dialog-add-aqls/dialog-add-aqls.component'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { IAql } from 'src/app/shared/models/aql/aql.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { PhenotypeGroupUiModel } from 'src/app/shared/models/phenotype/phenotype-group-ui.model'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'

@Component({
  selector: 'num-phenotype-editor-connector-group',
  templateUrl: './phenotype-editor-connector-group.component.html',
  styleUrls: ['./phenotype-editor-connector-group.component.scss'],
})
export class PhenotypeEditorConnectorGroupComponent implements OnInit, OnChanges {
  readonly phenotypeQueryType = PhenotypeQueryType
  readonly phenotypeGroupType = PhenotypeGroupType
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

  groupIndex: number[]
  groupType: string

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.groupType = !this.phenotypeGroup.indexInGroup
      ? PhenotypeGroupType.Main
      : PhenotypeGroupType.Sub
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'selfGroupIndex':
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

  addQuery(): void {
    this.openDialog()
  }

  openDialog(): void {
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
      dialogContentComponent: DialogAddAqlsComponent,
      title: 'ADD_AQL_DIALOG_HEADER',
      confirmButtonText: 'BUTTON.APPLY_SELECTION',
      cancelButtonText: 'BUTTON.CANCEL',
      dialogSize: DialogSize.Medium,
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
