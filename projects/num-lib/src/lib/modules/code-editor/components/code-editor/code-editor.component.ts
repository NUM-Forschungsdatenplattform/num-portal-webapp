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

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { distinctUntilChanged, throttleTime } from 'rxjs/operators'
import { NumAqlFormattingProvider } from '../../num-aql-formatting-provider'
import { numAqlTokenProvider } from '../../num-aql-token.provider'
import { editorConstructionOptions } from '../../num-editor-options'
import { numEditorTheme } from '../../num-editor.theme'
import { environment } from 'projects/num-lib/src/lib/environments/environment'
import { MonacoLoaderService } from '../../../../core/services/monaco-loader/monaco-loader.service'

@Component({
  selector: 'num-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy {
  /* istanbul ignore next */
  private readonly throttleTime = environment.name === 'test' ? 50 : 500
  readonly LANG_NAME = 'num-aql'
  constructor(private monacoLoaderService: MonacoLoaderService) {}

  subscriptions = new Subscription()
  formatter = new NumAqlFormattingProvider()

  @ViewChild('codeEditor') codeEditorElementRef: ElementRef
  codeEditor: monaco.editor.IStandaloneCodeEditor

  @Input() formatObservable$: Observable<any>
  @Input() validationObservable$: Observable<monaco.editor.IMarkerData[]>

  private componentValue: string
  @Input() set value(value: string) {
    if (this.componentValue !== value) {
      this.componentValue = value
      this.setValue(this.componentValue)
    }
  }

  @Output() valueChange = new EventEmitter<string>()

  @Output() editorInit = new EventEmitter<monaco.editor.IStandaloneCodeEditor>()

  ngAfterViewInit(): void {
    this.monacoLoaderService.loadMonaco().then(() => {
      this.afterMonacoLoad()
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    if (this.codeEditor) {
      this.codeEditor.dispose()
    }
  }

  afterMonacoLoad(): void {
    this.configureMonaco()
    this.createEditor()
  }

  configureMonaco(): void {
    monaco.editor.defineTheme('num-editor-theme', numEditorTheme)
    monaco.languages.register({ id: this.LANG_NAME })
    monaco.languages.setMonarchTokensProvider(this.LANG_NAME, numAqlTokenProvider)
    monaco.languages.registerDocumentFormattingEditProvider(this.LANG_NAME, {
      provideDocumentFormattingEdits: this.formatter.format,
    })
  }

  createEditor(): void {
    this.codeEditor = monaco.editor.create(
      this.codeEditorElementRef.nativeElement,
      editorConstructionOptions
    )
    this.setValue(this.componentValue)
    this.attachEditorEvents()
    this.subscriptions.add(fromEvent(window, 'resize').subscribe(() => this.handleResizeEvents()))
    this.subscriptions.add(
      this.formatObservable$
        .pipe(throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }))
        .subscribe(() => this.format())
    )
    this.subscriptions.add(
      this.validationObservable$
        .pipe(
          throttleTime(this.throttleTime, undefined, { leading: true, trailing: true }),
          distinctUntilChanged()
        )
        .subscribe((markers) => this.setMarkers(markers))
    )

    this.editorInit.emit(this.codeEditor)
  }

  attachEditorEvents(): void {
    this.codeEditor.onDidChangeModelContent((_event: monaco.editor.IModelContentChangedEvent) => {
      this.componentValue = this.codeEditor.getValue()
      this.valueChange.emit(this.componentValue)
    })
  }

  setValue(value = ''): void {
    if (this.codeEditor) {
      this.codeEditor.setValue(value)
    }
  }

  handleResizeEvents(): void {
    this.codeEditor.layout()
  }

  format(): void {
    this.codeEditor.getAction('editor.action.formatDocument').run()
  }

  setMarkers(markers: monaco.editor.IMarkerData[]): void {
    monaco.editor.setModelMarkers(this.codeEditor.getModel(), 'validationError', markers)
  }
}
