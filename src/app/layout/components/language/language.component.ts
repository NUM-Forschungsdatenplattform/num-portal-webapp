import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'num-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'en'])
    translate.setDefaultLang('de')

    const browserLang = translate.getBrowserLang()
    translate.use(browserLang.match(/de|en/) ? browserLang : 'de')
  }

  ngOnInit(): void {}
}
