import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AqlService } from './services/aql/aql.service'
import { CohortService } from './services/cohort/cohort.service'
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component'
import { LayoutModule } from '../layout/layout.module'
import { SharedModule } from '../shared/shared.module'
import { OAuthModule } from 'angular-oauth2-oidc'
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    OAuthModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [AqlService, CohortService],
  declarations: [GenericDialogComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core should only be imported to AppModule. It is already in place')
    }
  }
}
