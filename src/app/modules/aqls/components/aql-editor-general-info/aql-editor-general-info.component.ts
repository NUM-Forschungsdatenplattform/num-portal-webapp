import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-aql-editor-general-info',
  templateUrl: './aql-editor-general-info.component.html',
  styleUrls: ['./aql-editor-general-info.component.scss'],
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
