import { Injectable } from '@angular/core'
import { Resolve, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { USER_MANUAL_LINK } from '../constants'

@Injectable({
  providedIn: 'root',
})
export class UserManualUrlResolver implements Resolve<void> {
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}
  resolve(): void {
    let link: string
    if (this.translate.currentLang == 'de') {
      link = USER_MANUAL_LINK.DE
    } else {
      link = USER_MANUAL_LINK.EN
    }
    this.router.navigate([]).then((_) => {
      window.open(link, '_blank')
    })
  }
}
