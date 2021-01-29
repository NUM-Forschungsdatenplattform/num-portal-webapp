import { Component, OnInit } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'num-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  constructor(public translate: TranslateService, private dateAdapter: DateAdapter<Date>) {
    translate.addLangs(['de', 'en'])
    translate.setDefaultLang('de')
    this.dateAdapter.setLocale('de')

    const browserLang = translate.getBrowserLang()
    this.setLocale(browserLang.match(/de|en/) ? browserLang : 'de')
  }

  ngOnInit(): void {}

  setLocale(locale: string): void {
    this.dateAdapter.setLocale(locale)
    this.translate.use(locale)
  }
}
