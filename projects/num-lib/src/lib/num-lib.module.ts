import { NgModule } from '@angular/core';
import { NumLibComponent } from './num-lib.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AppConfigService } from './config/app-config.service';

@NgModule({
  declarations: [
    NumLibComponent
  ],
  imports: [
  ],
  exports: [
    NumLibComponent,
    DashboardModule
  ],
  providers: [
    AppConfigService
  ]
})
export class NumLibModule { }
