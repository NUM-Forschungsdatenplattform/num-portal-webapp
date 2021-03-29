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

import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips'

@Component({
  selector: 'num-project-editor-general-info-keywords-input',
  templateUrl: './project-editor-general-info-keywords-input.component.html',
  styleUrls: ['./project-editor-general-info-keywords-input.component.scss'],
})
export class ProjectEditorGeneralInfoKeywordsInputComponent implements OnInit {
  constructor() {}

  @Input() form: FormGroup
  separatorKeyCodes: number[] = [ENTER, COMMA]

  get keywords(): string[] {
    return this.form?.get('keywords')?.value || []
  }
  set keywords(value: string[]) {
    this.form?.get('keywords')?.setValue(value)
  }

  ngOnInit(): void {}

  addKeyword(event: MatChipInputEvent): void {
    const value = event.value?.trim()
    const keywords = this.keywords

    if (value && !this.keywords.includes(value)) {
      keywords.push(value)
      this.keywords = keywords.slice()
    }

    if (event.input) {
      event.input.value = ''
    }
  }

  removeKeyword(i: number): void {
    if (i >= 0) {
      this.keywords.splice(i, 1)
    }
  }
}
