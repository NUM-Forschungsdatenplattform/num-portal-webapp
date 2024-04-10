import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-data-protection',
  templateUrl: './data-protection.component.html',
})
export class DataProtectionComponent implements OnInit, OnDestroy {
  public subscriptions = new Subscription()
  constructor(private translateService: TranslateService) {}
  generalDataList: string[]
  registrationList: string[]
  cookiesList: string[]
  recipientsList: string[]
  rightsList: string[]
  decisionList: string[]

  ngOnInit(): void {
    this.getTranslations()

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe(() => {
        this.getTranslations()
      })
    )
  }

  getTranslations(): void {
    this.generalDataList = this.translateService?.instant('DATA_PROTECTION.GENERAL_DATA_LIST')
    this.registrationList = this.translateService?.instant('DATA_PROTECTION.REGISTRATION_LIST')
    this.cookiesList = this.translateService?.instant('DATA_PROTECTION.COOKIES_LIST')
    this.recipientsList = this.translateService?.instant(
      'DATA_PROTECTION.RECIPIENTS.PART_B.RECIPIENTS_LIST'
    )
    this.rightsList = this.translateService?.instant('DATA_PROTECTION.RIGHTS.RIGHTS_LIST')
    this.decisionList = this.translateService?.instant('DATA_PROTECTION.RIGHTS.RIGHTS_PART_J.LIST')
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
