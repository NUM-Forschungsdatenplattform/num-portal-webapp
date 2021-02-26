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
    library.addIcons(...FONT_AWESOME_ICONS)
  }
}
