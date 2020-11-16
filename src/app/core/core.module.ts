import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AqlService } from './services/aql.service'
import { CohortService } from './services/cohort.service'

import { OAuthModule } from 'angular-oauth2-oidc'

@NgModule({
  imports: [CommonModule, OAuthModule.forRoot()],
  providers: [AqlService, CohortService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core should only be imported to AppModule. It is already in place')
    }
  }
}
