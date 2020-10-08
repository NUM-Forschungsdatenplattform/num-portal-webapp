import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatButtonToggleModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...MATERIAL_MODULES,
  ]
})
export class MaterialModule { }
