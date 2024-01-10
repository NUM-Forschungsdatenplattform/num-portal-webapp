import { NgModule } from '@angular/core';
import { NumLibComponent } from './num-lib.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AppConfigService } from './config/app-config.service';
import { SearchModule } from './modules/search/search.module';

@NgModule({
  declarations: [
    NumLibComponent
  ],
  imports: [
  ],
  exports: [
    NumLibComponent,
    DashboardModule,
    SearchModule
  ],
  providers: [
    AppConfigService
  ]
})
export class NumLibModule { }
