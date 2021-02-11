import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Subject } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { NumAqlFormattingProvider } from 'src/app/modules/code-editor/num-aql-formatting-provider'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'
import { BUILDER_DIALOG_CONFIG } from './constants'

@Component({
  selector: 'num-aql-editor-creator',
  templateUrl: './aql-editor-creator.component.html',
  styleUrls: ['./aql-editor-creator.component.scss'],
})
export class AqlEditorCeatorComponent implements OnInit {
  constructor(private dialogService: DialogService) {}
  formatter = new NumAqlFormattingProvider()
  formatSubject$ = new Subject()
  formatObservable$ = this.formatSubject$.asObservable()

  isValidForExecution: boolean

  aqlQueryValue: string
  @Output() aqlQueryChange = new EventEmitter<string>()
  @Input()
  get aqlQuery(): string {
    return this.aqlQueryValue
  }
  set aqlQuery(aqlQuery: string) {
    this.aqlQueryValue = aqlQuery
    this.aqlQueryChange.emit(aqlQuery)
    this.isValidForExecution = this.validateExecution(aqlQuery)
  }

  @Input()
  isExecutionReady: boolean

  @Output() execute = new EventEmitter()

  editor: monaco.editor.IStandaloneCodeEditor
  aqbModel = new AqbUiModel()
  selectedTemplateIds: string[]

  ngOnInit(): void {}

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor): void {
    this.editor = editor
  }

  format(): void {
    this.formatSubject$.next()
  }

  validateExecution(query: string): boolean {
    const queryToCheck = query.toUpperCase()
    return (
      queryToCheck.length > 25 &&
      queryToCheck.includes('SELECT') &&
      queryToCheck.includes('FROM') &&
      queryToCheck.includes('CONTAINS') &&
      queryToCheck.includes('COMPOSITION')
    )
  }

  openBuilderDialog(): void {
    const dialogContentPayload: IAqlBuilderDialogInput = {
      mode: AqlBuilderDialogMode.AqlEditor,
      model: this.aqbModel,
      selectedTemplateIds: this.selectedTemplateIds,
    }

    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentPayload,
    }

    const dialogRef = this.dialogService.openDialog(dialogConfig)

    dialogRef.afterClosed().subscribe((confirmResult: IAqlBuilderDialogOutput | undefined) => {
      if (confirmResult) {
        this.handleDialogConfirm(confirmResult)
      }
    })
  }

  handleDialogConfirm(confirmResult: IAqlBuilderDialogOutput): void {
    this.aqbModel = confirmResult.model
    this.selectedTemplateIds = confirmResult.selectedTemplateIds
    this.aqlQuery = confirmResult.result.q
  }
}
