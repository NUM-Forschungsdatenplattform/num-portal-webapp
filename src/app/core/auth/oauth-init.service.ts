import { Injectable } from '@angular/core'
import { AppConfigService } from 'src/app/config/app-config.service'
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'

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

  constructor(private oauthService: OAuthService, private appConfig: AppConfigService) {}

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
        .loadDiscoveryDocumentAndLogin()
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
}
