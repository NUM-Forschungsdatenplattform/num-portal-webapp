import { Component, OnInit } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog.service'
import { ADD_DIALOG_CONFIG } from 'src/app/modules/phenotypes/components/phenotype-editor-connector-group/constants'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogAddResearchersComponent } from '../dialog-add-researchers/dialog-add-researchers.component'

@Component({
  selector: 'num-study-editor-researchers',
  templateUrl: './study-editor-researchers.component.html',
  styleUrls: ['./study-editor-researchers.component.scss'],
})
export class StudyEditorResearchersComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  addResearchers() {
    const dialogContentPayload = {}

    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddResearchersComponent,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    // dialogRef.afterClosed().subscribe((confirmResult: PhenotypeUiModel[] | undefined) => {
    //   if (Array.isArray(confirmResult)) {
    //     const currentGroups = this.cohortGroup.children.filter(
    //       (child) => child instanceof CohortGroupUiModel
    //     )

    //     this.cohortGroup.children = [...confirmResult, ...currentGroups]
    //   }
    // })
  }
}
