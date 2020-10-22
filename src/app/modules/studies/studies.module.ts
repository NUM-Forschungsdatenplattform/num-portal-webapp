import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudiesRoutingModule } from './studies-routing.module';
import { StudiesComponent } from './components/studies/studies.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [StudiesComponent],
  imports: [
    CommonModule,
    StudiesRoutingModule,
    SharedModule,
  ]
})
export class StudiesModule { }
