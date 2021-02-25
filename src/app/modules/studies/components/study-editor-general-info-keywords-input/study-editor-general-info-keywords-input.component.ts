import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips'

@Component({
  selector: 'num-study-editor-general-info-keywords-input',
  templateUrl: './study-editor-general-info-keywords-input.component.html',
  styleUrls: ['./study-editor-general-info-keywords-input.component.scss'],
})
export class StudyEditorGeneralInfoKeywordsInputComponent implements OnInit {
  constructor() {}

  @Input() form: FormGroup
  separatorKeysCodes: number[] = [ENTER, COMMA]

  get keywords(): string[] {
    return this.form.get('keywords')?.value || []
  }
  set keywords(value: string[]) {
    this.form.get('keywords').setValue(value)
  }

  ngOnInit(): void {}

  addKeyword(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value?.trim()
    const keywords = this.keywords

    if (value && !this.keywords.includes(value)) {
      keywords.push(value)
      this.keywords = keywords.slice()
    }

    if (input) input.value = ''
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword)

    if (index >= 0) this.keywords.splice(index, 1)
  }
}
