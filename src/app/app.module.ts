import { BrowserModule } from '@angular/platform-browser'
import { NgModule, inject, provideAppInitializer } from '@angular/core'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CoreModule } from './core/core.module'
import { LayoutModule } from './layout/layout.module'
import { AppConfigService } from './config/app-config.service'
import { OAuthInitService } from './core/auth/oauth-init.service'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { OAuthInterceptor } from './core/interceptors/oauth.interceptor'
import { AuthService } from './core/auth/auth.service'
import { DateAdapter } from '@angular/material/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { OAuthStorage } from 'angular-oauth2-oidc'
import { WebpackTranslateLoader } from './webpack-translate-loader'
import { ErrorInterceptor } from './core/interceptors/error.interceptor'

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    AppRoutingModule,
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
    provideAppInitializer(() => {
      const initializerFn = (
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
          )
      )(inject(AppConfigService), inject(OAuthInitService), inject(AuthService))
      return initializerFn()
    }),
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
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
