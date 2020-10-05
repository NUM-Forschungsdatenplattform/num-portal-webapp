import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

const MATERIAL_MODULES = [
  MatSliderModule
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
