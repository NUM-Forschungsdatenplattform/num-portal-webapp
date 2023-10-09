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

import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppConfigService, environmentToken } from '../../projects/num-lib/src/lib/config/app-config.service'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { DateAdapter } from '@angular/material/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { OAuthStorage } from 'angular-oauth2-oidc'
import { WebpackTranslateLoader } from './webpack-translate-loader'
import { environment } from 'src/environments/environment'
import { LayoutModule } from 'projects/num-lib/src/lib/layout/layout.module'
import { OAuthInterceptor } from 'projects/num-lib/src/lib/core/interceptors/oauth.interceptor'
import { CoreModule } from 'projects/num-lib/src/lib/core/core.module'
import { ErrorInterceptor } from 'projects/num-lib/src/lib/core/interceptors/error.interceptor'
import { AuthService } from 'projects/num-lib/src/lib/core/auth/auth.service'
import { OAuthInitService } from 'projects/num-lib/src/lib/core/auth/oauth-init.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader,
      },
    }),
  ],
  providers: [
    { provide: OAuthStorage, useValue: localStorage },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService, OAuthInitService, AuthService],
      useFactory:
        (
          configService: AppConfigService,
          oauthInitService: OAuthInitService,
          authService: AuthService
        ) =>
        () =>
          configService.loadConfig().then(() =>
            oauthInitService.initOAuth().then(() => {
              authService.fetchUserInfo().then(() => {
                authService.initTokenHandling()
              })
            })
          ),
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OAuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    { provide: DateAdapter, useClass: MomentDateAdapter },
    {
      provide: environmentToken,
      useValue: environment
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
