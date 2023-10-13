import { NgModule } from '@angular/core';
import { NumLibComponent } from './num-lib.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
  declarations: [
    NumLibComponent
  ],
  imports: [
  ],
  exports: [
    NumLibComponent,
    DashboardModule
  ]
})
export class NumLibModule { }
