import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GroupIndexPipe } from './pipes/group-index.pipe'
import { LocalizedDatePipe } from './pipes/localized-date.pipe'
import { LayoutModule } from '../layout/layout.module'
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { DirectivesModule } from './directives/directives.module'
import { SharedComponentsModule } from './components/shared-components.module'
import localeEn from '@angular/common/locales/en'
import localeDe from '@angular/common/locales/de'

registerLocaleData(localeEn, 'en')
registerLocaleData(localeDe, 'de')

const SHARED_MODULES = [
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  DirectivesModule,
  SharedComponentsModule,
]
const SHARED_DECLARATIONS = [GroupIndexPipe, LocalizedDatePipe]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [...SHARED_MODULES, CommonModule, LayoutModule],
  exports: [...SHARED_MODULES, ...SHARED_DECLARATIONS],
  providers: [DatePipe],
})
export class SharedModule {}
