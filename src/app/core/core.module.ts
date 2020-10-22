import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AqlService } from './services/aql.service';



@NgModule({
  declarations: [],
  providers: [AqlService],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'Core should only be imported to AppModule. It is already in place');
    }
  }
}
