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
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-data-protection',
  templateUrl: './data-protection.component.html',
})
export class DataProtectionComponent implements OnInit, OnDestroy {
  public subscriptions = new Subscription()
  constructor() {}
  generalDataList: string[]
  registrationList: string[]
  cookiesList: string[]
  recipientsList: string[]
  rightsList: string[]
  decisionList: string[]

  ngOnInit(): void {
    this.getTranslations()

    // this.subscriptions.add(
      // this.translateService.onLangChange.subscribe((newLang) => {
        this.getTranslations()
      // })
    // )
  }

  getTranslations(): void {
    this.generalDataList = ['DATA_PROTECTION.GENERAL_DATA_LIST']
    this.registrationList = ['DATA_PROTECTION.REGISTRATION_LIST']
    this.cookiesList = ['DATA_PROTECTION.COOKIES_LIST']
    this.recipientsList = ['DATA_PROTECTION.RECIPIENTS.PART_B.RECIPIENTS_LIST']
    this.rightsList = ['DATA_PROTECTION.RIGHTS.RIGHTS_LIST']
    this.decisionList = ['DATA_PROTECTION.RIGHTS.RIGHTS_PART_J.LIST']
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
