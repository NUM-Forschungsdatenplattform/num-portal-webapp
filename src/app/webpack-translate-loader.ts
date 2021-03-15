import { TranslateLoader } from '@ngx-translate/core'
import { from, Observable } from 'rxjs'

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(
      import(/* webpackChunkName: "translations-[request]" */ `../assets/i18n/${lang}.json`)
    )
  }
}
