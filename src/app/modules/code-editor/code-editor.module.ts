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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
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
