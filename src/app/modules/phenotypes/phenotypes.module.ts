import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhenotypesRoutingModule } from './phenotypes-routing.module';
import { PhenotypesComponent } from './components/phenotypes/phenotypes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhenotypeEditorComponent } from './components/phenotype-editor/phenotype-editor.component';


@NgModule({
  declarations: [PhenotypesComponent, PhenotypeEditorComponent],
  imports: [
    CommonModule,
    PhenotypesRoutingModule,
    SharedModule,
  ]
})
export class PhenotypesModule { }
