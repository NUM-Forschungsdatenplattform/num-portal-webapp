/// <reference path="../../../../node_modules/monaco-editor/monaco.d.ts" />

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CodeEditorComponent } from './components/code-editor/code-editor.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [CodeEditorComponent],
  imports: [CommonModule, FormsModule],
  exports: [CodeEditorComponent],
})
export class CodeEditorModule {}
