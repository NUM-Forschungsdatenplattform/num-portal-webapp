import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ADD_RESEARCHERS_DIALOG_CONFIG } from './constants'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogAddResearchersComponent } from '../dialog-add-researchers/dialog-add-researchers.component'
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table'

@Component({
  selector: 'num-project-editor-researchers',
  templateUrl: './project-editor-researchers.component.html',
  styleUrls: ['./projet-editor-researchers.component.scss'],
})
export class ProjectEditorResearchersComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  dataSource = new MatTableDataSource<IUser>()
  displayedColumns: string[] = ['user', 'icon']

  @Input() isDisabled: boolean
  @Input() isLoadingComplete: boolean

  researchersValue: IUser[] = []
  @Output() researchersChange = new EventEmitter<IUser[]>()
  @Input()
  get researchers(): IUser[] {
    return this.researchersValue
  }
  set researchers(researchers: IUser[]) {
    this.researchersValue = researchers
    this.dataSource.data = researchers
    this.researchersChange.emit(researchers)
  }

  ngOnInit(): void {
    this.dataSource.data = this.researchers
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
        this.researchers = confirmResult
      }
    })
  }

  deleteResearcher(researcherId: string): void {
    this.dataSource.data = this.dataSource.data.filter((researcher: IUser) => {
      return researcher.id !== researcherId
    })
    this.researchers = this.dataSource.data
  }
}
