import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'
import { MonacoLoaderService } from 'src/app/core/services/monaco-loader.service'
import { numAqlTokenProvider } from '../../num-aql-token.provider'
import { editorConstructionOptions } from '../../num-editor-options'
import { numEditorTheme } from '../../num-editor.theme'

@Component({
  selector: 'num-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly LANG_NAME = 'num-aql'
  constructor(private monacoLoaderService: MonacoLoaderService) {}

  subscriptions = new Subscription()

  @ViewChild('codeEditor') codeEditorElementRef: ElementRef
  codeEditor: monaco.editor.IStandaloneCodeEditor

  private componentValue: string

  @Input() set value(value: string) {
    this.componentValue = value
    this.setValue(this.componentValue)
  }

  @Output() editorInit = new EventEmitter<monaco.editor.IStandaloneCodeEditor>()

  ngOnInit(): void {}

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
  }

  createEditor(): void {
    this.codeEditor = monaco.editor.create(
      this.codeEditorElementRef.nativeElement,
      editorConstructionOptions
    )
    this.setValue(this.componentValue)
    this.attachEditorEvents()
    this.subscriptions.add(fromEvent(window, 'resize').subscribe(() => this.handleResizeEvents()))
    this.editorInit.emit(this.codeEditor)
  }

  attachEditorEvents(): void {
    this.codeEditor.onDidChangeModelContent((event: monaco.editor.IModelContentChangedEvent) => {
      this.componentValue = this.codeEditor.getValue()
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
}
