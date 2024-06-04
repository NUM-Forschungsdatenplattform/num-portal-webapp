import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { DirectivesModule } from './directives/directives.module'
import { SharedComponentsModule } from './components/shared-components.module'
import localeEn from '@angular/common/locales/en'
import localeDe from '@angular/common/locales/de'

registerLocaleData(localeEn, 'en')
registerLocaleData(localeDe, 'de')
import { PipesModule } from './pipes/pipes.module'
import { LayoutModule } from '../layout/layout.module'

const SHARED_MODULES = [
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  DirectivesModule,
  PipesModule,
  SharedComponentsModule,
]

@NgModule({
  declarations: [],
  imports: [...SHARED_MODULES, CommonModule, LayoutModule],
  exports: [...SHARED_MODULES],
  providers: [DatePipe],
})
export class SharedModule {}
