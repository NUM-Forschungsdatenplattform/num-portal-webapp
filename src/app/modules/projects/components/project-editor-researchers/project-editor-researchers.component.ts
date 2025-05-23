import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ADD_RESEARCHERS_DIALOG_CONFIG } from './constants'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { DialogAddResearchersComponent } from '../dialog-add-researchers/dialog-add-researchers.component'
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table'
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion'
import { FlexModule } from '@angular/flex-layout/flex'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatIconButton } from '@angular/material/button'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { MatProgressBar } from '@angular/material/progress-bar'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-project-editor-researchers',
  templateUrl: './project-editor-researchers.component.html',
  styleUrls: ['./projet-editor-researchers.component.scss'],
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    FlexModule,
    FaIconComponent,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    ButtonComponent,
    MatProgressBar,
    TranslatePipe,
  ],
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
