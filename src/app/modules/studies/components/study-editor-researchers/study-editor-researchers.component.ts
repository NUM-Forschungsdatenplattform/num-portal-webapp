import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog.service'
import { ADD_RESEARCHERS_DIALOG_CONFIG } from './constants'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogAddResearchersComponent } from '../dialog-add-researchers/dialog-add-researchers.component'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'num-study-editor-researchers',
  templateUrl: './study-editor-researchers.component.html',
  styleUrls: ['./study-editor-researchers.component.scss'],
})
export class StudyEditorResearchersComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  dataSource = new MatTableDataSource<IUser>()
  displayedColumns: string[] = ['user', 'icon']

  @Input() researchers: IUser[]
  @Output() researchersChange = new EventEmitter<IUser[]>()

  ngOnInit(): void {
    if (this.researchers && this.researchers.length > 0) {
      this.dataSource.data = this.researchers
    }
  }

  addResearchers(): void {
    const dialogConfig: DialogConfig = {
      ...ADD_RESEARCHERS_DIALOG_CONFIG,
      dialogContentComponent: DialogAddResearchersComponent,
      dialogContentPayload: this.dataSource.data,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IUser[] | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.dataSource.data = confirmResult
        this.researchersChange.emit(confirmResult)
      }
    })
  }

  deleteResearcher(researcherId: string): void {
    this.dataSource.data = this.dataSource.data.filter((researcher: IUser) => {
      return researcher.id !== researcherId
    })
    this.researchersChange.emit(this.dataSource.data)
  }
}
