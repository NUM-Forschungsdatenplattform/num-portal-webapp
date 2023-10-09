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
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { RouterModule } from '@angular/router'
import { AppLayoutComponent } from './components/app-layout/app-layout.component'
import { HeaderComponent } from './components/header/header.component'
import { SideMenuComponent } from './components/side-menu/side-menu.component'
import { LanguageComponent } from './components/language/language.component'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome'
import { FONT_AWESOME_ICONS } from './font-awesome-icons'
import { FooterComponent } from './components/footer/footer.component'
import { TranslateModule } from '@ngx-translate/core'
import { DirectivesModule } from '../shared/directives/directives.module'
import { CUSTOM_ICONS } from './custom-icons'
import { SharedComponentsModule } from '../shared/components/shared-components.module'

const SHARED_MODULES = [MaterialModule, FlexLayoutModule, FontAwesomeModule]

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
    SideMenuComponent,
    LanguageComponent,
    FooterComponent,
  ],
  imports: [
    ...SHARED_MODULES,
    CommonModule,
    RouterModule,
    TranslateModule,
    DirectivesModule,
    SharedComponentsModule,
  ],
  exports: [...SHARED_MODULES, AppLayoutComponent],
})
export class LayoutModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(...FONT_AWESOME_ICONS, ...CUSTOM_ICONS)
  }
}
