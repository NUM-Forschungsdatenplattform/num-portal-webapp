import { Component } from '@angular/core'
import { DateAdapter } from '@angular/material/core'
import { TranslateService, TranslatePipe } from '@ngx-translate/core'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle'

@Component({
  selector: 'num-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  imports: [FaIconComponent, MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
})
export class LanguageComponent {
  constructor(
    public translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
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
