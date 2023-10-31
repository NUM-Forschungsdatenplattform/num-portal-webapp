import { NgModule } from '@angular/core';
import { NumLibComponent } from './num-lib.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { environment } from './environments/environment';
import { AppConfigService, ENVIROMENT_TOKEN } from './config/app-config.service';

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
    {
      provide: ENVIROMENT_TOKEN,
      useValue: environment
    },
    AppConfigService
  ]
})
export class NumLibModule { }
