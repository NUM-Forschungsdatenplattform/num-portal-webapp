import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudiesComponent } from './components/studies/studies.component';

const routes: Routes = [
  { path: '', component: StudiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudiesRoutingModule { }
