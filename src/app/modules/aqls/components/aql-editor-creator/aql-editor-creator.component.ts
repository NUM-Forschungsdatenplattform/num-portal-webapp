import { Component, OnInit } from '@angular/core'
import { AqlEditorService } from 'src/app/core/services/aql-editor.service'
import { DialogService } from 'src/app/core/services/dialog.service'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'
import { DialogAqlBuilderComponent } from '../dialog-aql-builder/dialog-aql-builder.component'
import { BUILDER_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-aql-editor-creator',
  templateUrl: './aql-editor-creator.component.html',
  styleUrls: ['./aql-editor-creator.component.scss'],
})
export class AqlEditorCeatorComponent implements OnInit {
  constructor(private dialogService: DialogService, private aqlEditorService: AqlEditorService) {}

  code = ''
  editor: monaco.editor.IStandaloneCodeEditor
  aqbModel = new AqbUiModel()

  ngOnInit(): void {}

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor): void {
    this.editor = editor
  }

  openBuilderDialog(): void {
    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentComponent: DialogAqlBuilderComponent,
      dialogContentPayload: this.aqbModel,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: AqbUiModel | undefined) => {
      if (confirmResult instanceof AqbUiModel) {
        this.handleDialogConfirm(confirmResult)
      }
    })
  }

  handleDialogConfirm(aqbModel: AqbUiModel): void {
    this.aqbModel = aqbModel
    const aqbApiModel = aqbModel.convertToApi()
    this.aqlEditorService.buildAql(aqbApiModel).subscribe((result) => {
      this.code = result.q
    })
  }
}
