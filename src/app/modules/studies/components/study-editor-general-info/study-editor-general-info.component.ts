import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { DateAdapter } from '@angular/material/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-study-editor-general-info',
  templateUrl: './study-editor-general-info.component.html',
  styleUrls: ['./study-editor-general-info.component.scss'],
})
export class StudyEditorGeneralInfoComponent implements OnInit, OnDestroy {
  constructor(private dateAdapter: DateAdapter<any>, private translate: TranslateService) {}

  @Input() form: FormGroup
  @Input() isDisabled: boolean
  @Input() generalInfoData: IDefinitionList[]

  private subscriptions = new Subscription()

  ngOnInit(): void {
    this.dateAdapter.setLocale(this.translate.currentLang)

    this.subscriptions.add(
      this.translate.onLangChange.subscribe((lang) => {
        this.dateAdapter.setLocale(lang.lang)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
