import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateService, TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatCard, MatCardContent } from '@angular/material/card'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatSelect, MatOption } from '@angular/material/select'
import { MatCheckbox } from '@angular/material/checkbox'
import { ObjectToArrayPipe } from '../../../../shared/pipes/object-to-array.pipe'

@Component({
  selector: 'num-aql-editor-general-info',
  templateUrl: './aql-editor-general-info.component.html',
  styleUrls: ['./aql-editor-general-info.component.scss'],
  imports: [
    FlexModule,
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    TranslateDirective,
    MatSelect,
    MatOption,
    MatCheckbox,
    TranslatePipe,
    ObjectToArrayPipe,
  ],
})
export class AqlEditorGeneralInfoComponent implements OnDestroy, OnInit {
  @Input() availableCategories: any
  @Input() form: UntypedFormGroup

  lang = 'en'

  private subscriptions = new Subscription()

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event) => {
        this.lang = event.lang
      })
    )

    this.lang = this.translateService.currentLang
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
