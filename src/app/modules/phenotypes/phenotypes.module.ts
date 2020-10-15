import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhenotypesRoutingModule } from './phenotypes-routing.module';
import { PhenotypesComponent } from './components/phenotypes/phenotypes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PhenotypesComponent],
  imports: [
    CommonModule,
    PhenotypesRoutingModule,
    SharedModule,
  ]
})
export class PhenotypesModule { }
