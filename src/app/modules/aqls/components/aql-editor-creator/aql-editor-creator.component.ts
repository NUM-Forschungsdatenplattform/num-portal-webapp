import { Component, OnInit } from '@angular/core'
import { DialogService } from 'src/app/core/services/dialog.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogAqlBuilderComponent } from '../dialog-aql-builder/dialog-aql-builder.component'
import { BUILDER_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-aql-editor-creator',
  templateUrl: './aql-editor-creator.component.html',
  styleUrls: ['./aql-editor-creator.component.scss'],
})
export class AqlEditorCeatorComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  code = ''
  editor: monaco.editor.IStandaloneCodeEditor

  ngOnInit(): void {}

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor): void {
    this.editor = editor
  }

  openBuilderDialog(): void {
    const dialogContentPayload = {}

    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentComponent: DialogAqlBuilderComponent,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: any | undefined) => {
      console.log(confirmResult)
      // TODO: Handle confirmResult
    })
  }
}
