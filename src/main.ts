import { enableProdMode, provideAppInitializer, inject, importProvidersFrom } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { environment } from './environments/environment'
import { OAuthStorage } from 'angular-oauth2-oidc'
import { AppConfigService } from './app/config/app-config.service'
import { OAuthInitService } from './app/core/auth/oauth-init.service'
import { AuthService } from './app/core/auth/auth.service'
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { OAuthInterceptor } from './app/core/interceptors/oauth.interceptor'
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor'
import { DateAdapter } from '@angular/material/core'
import { MomentDateAdapter } from '@angular/material-moment-adapter'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { CoreModule } from './app/core/core.module'
import { LayoutModule } from './app/layout/layout.module'
import { AppRoutingModule } from './app/app-routing.module'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { WebpackTranslateLoader } from './app/webpack-translate-loader'
import { AppComponent } from './app/app.component'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      CoreModule,
      LayoutModule,
      AppRoutingModule,
      TranslateModule.forRoot({
        defaultLanguage: 'de',
        loader: {
          provide: TranslateLoader,
          useClass: WebpackTranslateLoader,
        },
      })
    ),
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
    provideAnimations(),
  ],
}).catch((err) => {
  console.error(err)
  const rootElement = document.getElementsByTagName('num-root')[0]
  rootElement.innerHTML = err
})
