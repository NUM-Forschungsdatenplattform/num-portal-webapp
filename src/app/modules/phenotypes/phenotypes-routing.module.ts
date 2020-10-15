import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhenotypesComponent } from './components/phenotypes/phenotypes.component';

const routes: Routes = [{ path: '', component: PhenotypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhenotypesRoutingModule { }
