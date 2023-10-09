/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AqlService } from './services/aql/aql.service'
import { CohortService } from './services/cohort/cohort.service'
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component'
import { OAuthModule } from 'angular-oauth2-oidc'
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'
import { SharedModule } from '../shared/shared.module'
import { LayoutModule } from '../layout/layout.module'

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
