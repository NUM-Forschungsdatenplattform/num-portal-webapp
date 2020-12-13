import { Component, OnInit } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog.service'
import { ADD_RESEARCHERS_DIALOG_CONFIG } from './constants'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'
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

  addResearchers(): void {
    const dialogConfig: DialogConfig = {
      ...ADD_RESEARCHERS_DIALOG_CONFIG,
      dialogContentComponent: DialogAddResearchersComponent,
      dialogContentPayload: this.studyResearchers,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IUser[] | undefined) => {
      if (Array.isArray(confirmResult)) {
        this.studyResearchers = confirmResult
      }
    })
  }

  deleteResearcher(researcherId: string): void {
    this.studyResearchers = this.studyResearchers.filter((researcher: IUser) => {
      return researcher.id !== researcherId
    })
  }
}
