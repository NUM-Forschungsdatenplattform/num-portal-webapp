import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'num-aql-editor-creator',
  templateUrl: './aql-editor-creator.component.html',
  styleUrls: ['./aql-editor-creator.component.scss'],
})
export class AqlEditorCeatorComponent implements OnInit {
  constructor() {}

  code = ''
  editor: monaco.editor.IStandaloneCodeEditor

  ngOnInit(): void {}

  onEditorInit(editor: monaco.editor.IStandaloneCodeEditor): void {
    this.editor = editor
  }
}
