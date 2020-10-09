import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { LanguageComponent } from './components/language/language.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppLayoutComponent, HeaderComponent, SideMenuComponent, LanguageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    AppLayoutComponent,
  ]
})
export class LayoutModule { }
