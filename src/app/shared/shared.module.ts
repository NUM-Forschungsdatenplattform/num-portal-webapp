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
