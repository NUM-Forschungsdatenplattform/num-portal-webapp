import { FormControl, FormGroupDirective, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

export class InputErrorStateMatcher implements ErrorStateMatcher {
  private requiredField: 'urlRequired' | 'titleRequired'
  constructor(requiredField: 'urlRequired' | 'titleRequired') {
    this.requiredField = requiredField
  }

  isErrorState(
    control: FormControl | null,
    formGroup: FormGroupDirective | NgForm | null
  ): boolean {
    const requiredError = formGroup.form.errors ? formGroup.form.errors[this.requiredField] : false
    return !!(requiredError || control.invalid)
  }
}
