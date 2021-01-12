import { Injectable } from '@angular/core'
import { AppConfigService } from 'src/app/config/app-config.service'
import { OAuthService, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { from, Observable, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class OAuthInitService {
  private readonly TERMINATION_TIMEOUT = 20_000

  private readonly ERROR_INIT_FAIL = 'App was not able to initialize the authentication service'
  private readonly ERROR_TIMEOUT = `${this.ERROR_INIT_FAIL} after waiting for ${this.TERMINATION_TIMEOUT} ms`
  private readonly ERROR_UNREACHABLE = `${this.ERROR_INIT_FAIL} while connecting to the authentication server`

  private BASE_URL: string
  private REALM: string
  private CLIENT_ID: string

  private AUTH_CONFIG: AuthConfig

  constructor(
    private oauthService: OAuthService,
    private appConfig: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.oauthService.events.subscribe((event) => {
      if (event.type === 'token_received') {
        this.createUserDetails().subscribe()
      }
    })
  }

  public initOAuth(): Promise<boolean> {
    let terminationTimer: number
    this.initVariables()

    return new Promise(async (resolve, reject) => {
      const terminationTimeout = new Promise((_, onTimeout) => {
        terminationTimer = window.setTimeout(() => {
          onTimeout(this.ERROR_TIMEOUT)
        }, this.TERMINATION_TIMEOUT)
      })

      this.oauthService.configure(this.AUTH_CONFIG)
      const init = this.oauthService
        .loadDiscoveryDocumentAndTryLogin()
        .then(() => {
          this.oauthService.setupAutomaticSilentRefresh()
        })
        .catch(() => {
          return reject(this.ERROR_UNREACHABLE)
        })

      return Promise.race([init, terminationTimeout])
        .then(() => {
          clearTimeout(terminationTimer)
          return resolve(true)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }

  private initVariables(): void {
    this.BASE_URL = this.appConfig.config.auth.baseUrl
    this.REALM = this.appConfig.config.auth.realm
    this.CLIENT_ID = this.appConfig.config.auth.clientId

    this.AUTH_CONFIG = {
      issuer: `${this.BASE_URL}/auth/realms/${this.REALM}`,
      clientId: this.CLIENT_ID,
      responseType: 'code',
      redirectUri: window.location.origin + '/home',
      scope: 'openid profile email roles',
      useSilentRefresh: true,
      silentRefreshTimeout: 5000,
      timeoutFactor: 0.25,
      sessionChecksEnabled: true,
      clearHashAfterLogin: false,
      nonceStateSeparator: 'semicolon',
    }
  }

  private createUserDetails(): Observable<string> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }

    return from(this.oauthService.loadUserProfile()).pipe(
      switchMap((userInfo) => {
        return this.httpClient.post<string>(
          `${this.appConfig.config.api.baseUrl}/admin/user/${userInfo.sub}`,
          '',
          httpOptions
        )
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
