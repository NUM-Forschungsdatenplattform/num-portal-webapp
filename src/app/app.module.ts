import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER } from '@angular/core'
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
import { CustomDatePickerAdapter } from './core/adapter/date-picker-adapter'
import { OAuthStorage } from 'angular-oauth2-oidc'
import { WebpackTranslateLoader } from './webpack-translate-loader'

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
      useFactory: (
        configService: AppConfigService,
        oauthInitService: OAuthInitService,
        authService: AuthService
      ) => () =>
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
    { provide: DateAdapter, useClass: CustomDatePickerAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
