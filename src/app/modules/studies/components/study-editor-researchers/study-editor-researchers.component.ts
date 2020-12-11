import { Component, OnInit } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog.service'
import { ADD_RESEARCHERS_DIALOG_CONFIG } from 'src/app/modules/phenotypes/components/phenotype-editor-connector-group/constants'
import { IUser } from 'src/app/shared/models/admin/user.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogAddResearchersComponent } from '../dialog-add-researchers/dialog-add-researchers.component'

@Component({
  selector: 'num-study-editor-researchers',
  templateUrl: './study-editor-researchers.component.html',
  styleUrls: ['./study-editor-researchers.component.scss'],
})
export class StudyEditorResearchersComponent implements OnInit {
  constructor(private dialogService: DialogService) {}
  studyResearchers: IUser[] = []

  ngOnInit(): void {}

  addResearchers() {
    const dialogContentPayload = {}

    const dialogConfig: DialogConfig = {
      ...ADD_RESEARCHERS_DIALOG_CONFIG,
      dialogContentComponent: DialogAddResearchersComponent,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IUser[] | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.studyResearchers = confirmResult
      }
    })
  }
}
