import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Subscription } from 'rxjs'
import { InputErrorStateMatcher } from './error-state-matcher'
import { MatCard } from '@angular/material/card'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-navigation-editor-item',
  templateUrl: './navigation-editor-item.component.html',
  styleUrls: ['./navigation-editor-item.component.scss'],
  imports: [
    MatCard,
    NgClass,
    ExtendedModule,
    FormsModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    FaIconComponent,
    ButtonComponent,
    MatProgressSpinner,
    TranslatePipe,
  ],
})
export class NavigationEditorItemComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor() {}

  @Input()
  index: number

  @Input()
  form: UntypedFormGroup

  @Input()
  isLoading = true

  urlErrorStateMatcher = new InputErrorStateMatcher('urlRequired')
  titleErrorStateMatcher = new InputErrorStateMatcher('titleRequired')

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.get('url').valueChanges.subscribe((value) => this.handleUrlChange(value))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleUrlChange(value: string): void {
    this.form.get('url').setValue(value.trim(), { emitEvent: false })
  }

  clearInput(): void {
    this.form.patchValue({
      title: '',
      url: '',
    })
  }
}
