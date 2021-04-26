/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Subject } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { NumAqlFormattingProvider } from 'src/app/modules/code-editor/num-aql-formatting-provider'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { IAqlValidationResponse } from 'src/app/shared/models/archetype-query-builder/aql-validation-response.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'
import {
  BUILDER_DIALOG_CONFIG,
  VALIDATION_ERROR_CONFIG,
  VALIDATION_SUCCESS_CONFIG,
} from './constants'

@Component({
  selector: 'num-aql-editor-creator',
  templateUrl: './aql-editor-creator.component.html',
  styleUrls: ['./aql-editor-creator.component.scss'],
})
export class AqlEditorCeatorComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    private aqlEditorService: AqlEditorService,
    private aqlService: AqlService,
    private toastMessageService: ToastMessageService
  ) {}
  formatter = new NumAqlFormattingProvider()
  formatSubject$ = new Subject<monaco.editor.IMarkerData[]>()
  formatObservable$ = this.formatSubject$.asObservable()

  validationSubject$ = new Subject()
  validationObservable$ = this.validationSubject$.asObservable()

  isValidForExecution: boolean
  isExecutionLoading: boolean
  determineHitsContent: IDetermineHits = {
    defaultMessage: 'AQL.HITS.MESSAGE_SET_ALL_PARAMETERS',
  }

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
    this.validationSubject$.next(null)
    this.updateDetermineHits(null, '')
  }

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

  setError(validationResult: IAqlValidationResponse): void {
    const editorMarker: monaco.editor.IMarkerData = {
      message: validationResult.message,
      severity: monaco.MarkerSeverity.Error,
      startColumn: +validationResult.startColumn,
      startLineNumber: +validationResult.startLine,
      endColumn: 1000,
      endLineNumber: +validationResult.startLine,
    }

    this.validationSubject$.next([editorMarker])
    this.toastMessageService.openToast(VALIDATION_ERROR_CONFIG)
  }

  async validate(showSuccess?: boolean): Promise<boolean> {
    let validationResult: IAqlValidationResponse
    try {
      validationResult = await this.aqlEditorService.validateAql(this.aqlQuery).toPromise()
      if (!validationResult.valid) {
        this.setError(validationResult)
        return false
      } else {
        if (showSuccess) {
          this.toastMessageService.openToast(VALIDATION_SUCCESS_CONFIG)
          this.validationSubject$.next(null)
        }
        return true
      }
    } catch (error) {
      this.toastMessageService.openToast(VALIDATION_ERROR_CONFIG)
      return false
    }
  }

  validateExecution(query: string): boolean {
    const queryToCheck = query.toUpperCase()
    return (
      queryToCheck.length > 15 && queryToCheck.includes('SELECT') && queryToCheck.includes('FROM')
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

  updateDetermineHits(count?: number | null, message?: string, isLoading = false): void {
    this.determineHitsContent = {
      defaultMessage: this.determineHitsContent.defaultMessage,
      message,
      count,
      isLoading,
    }
  }

  async determineHits(): Promise<void> {
    if (this.aqlQuery && this.aqlQuery.length) {
      this.updateDetermineHits(null, '', true)

      try {
        await this.aqlService
          .getSize(this.aqlQuery)
          .toPromise()
          .then((result) => {
            this.updateDetermineHits(result, '')
          })
      } catch (error) {
        if (error.status === 451) {
          // *** Error 451 means too few hits ***
          this.updateDetermineHits(null, 'AQL.HITS.MESSAGE_ERROR_FEW_HITS')
        } else if (error.status === 400) {
          try {
            const firstError = JSON.parse(error.error?.errors[0])
            if (firstError.valid === false) {
              this.updateDetermineHits(null, 'AQL.VALIDATION_ERROR')
              this.setError(firstError as IAqlValidationResponse)
            } else {
              this.updateDetermineHits(null, 'AQL.HITS.MESSAGE_ERROR_MESSAGE')
            }
          } catch (_) {
            this.updateDetermineHits(null, 'AQL.HITS.MESSAGE_ERROR_MESSAGE')
          }
        } else {
          this.updateDetermineHits(null, 'AQL.HITS.MESSAGE_ERROR_MESSAGE')
        }
      }
    } else {
      this.updateDetermineHits(null, 'AQL.HITS.MESSAGE_SET_ALL_PARAMETERS')
    }
  }
}
