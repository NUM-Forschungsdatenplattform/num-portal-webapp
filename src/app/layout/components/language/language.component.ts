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

import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'num-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  constructor(
    public translate: TranslateService,
    private dateAdapter: DateAdapter<Date>,
  ) {
    translate.addLangs(['de', 'en'])
    translate.setDefaultLang('de')
    this.dateAdapter.setLocale('de')

    const selectedLang = localStorage.getItem('lang')
    if (selectedLang && selectedLang.match(/de|en/)) {
      this.setLocale(selectedLang)
    } else {
      const browserLang = translate.getBrowserLang()
      this.setLocale(browserLang.match(/de|en/) ? browserLang : 'de')
    }
  }

  setLocale(locale: string): void {
    localStorage.setItem('lang', locale)
    this.dateAdapter.setLocale(locale)
    this.translate.use(locale)
  }
}
