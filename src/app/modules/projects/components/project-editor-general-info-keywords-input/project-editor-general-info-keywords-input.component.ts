import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Component, Input } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import {
  MatChipInputEvent,
  MatChipGrid,
  MatChipOption,
  MatChipRemove,
  MatChipInput,
} from '@angular/material/chips'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatIconButton } from '@angular/material/button'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-project-editor-general-info-keywords-input',
  templateUrl: './project-editor-general-info-keywords-input.component.html',
  styleUrls: ['./project-editor-general-info-keywords-input.component.scss'],
  imports: [
    MatFormField,
    MatLabel,
    MatChipGrid,
    MatChipOption,
    MatIconButton,
    MatChipRemove,
    FaIconComponent,
    MatChipInput,
    TranslatePipe,
  ],
})
export class ProjectEditorGeneralInfoKeywordsInputComponent {
  constructor() {}

  @Input() form: UntypedFormGroup
  separatorKeyCodes: number[] = [ENTER, COMMA]

  get keywords(): string[] {
    return this.form?.get('keywords')?.value || []
  }
  set keywords(value: string[]) {
    this.form?.get('keywords')?.setValue(value)
  }

  addKeyword(event: MatChipInputEvent): void {
    const value = event.value?.trim()
    const keywords = this.keywords

    if (value && !this.keywords.includes(value)) {
      keywords.push(value)
      this.keywords = keywords.slice()
    }

    if (event.value) {
      event.value = ''
    }
  }

  removeKeyword(i: number): void {
    if (i >= 0) {
      this.keywords.splice(i, 1)
    }
  }
}
