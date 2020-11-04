import { KeycloakService } from 'keycloak-angular'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AppConfigService } from 'src/app/config/app-config.service'
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js'

@Injectable({ providedIn: 'root' })
export class KeycloakInitService {
  private readonly TERMINATION_TIMEOUT = 20_000
  private readonly HAPPY_TIMEOUT = 2_000

  private readonly ERROR_INIT_FAIL = 'App was not able to initialize the authentication service'
  private readonly ERROR_TIMEOUT = `${this.ERROR_INIT_FAIL} after waiting for ${this.TERMINATION_TIMEOUT} ms`
  private readonly ERROR_UNREACHABLE = `${this.ERROR_INIT_FAIL} while connecting to the authentication server`

  private BASE_URL: string
  private REALM: string
  private CLIENT_ID: string

  private TEST_URL: string

  private KEYCLOAK_CONFIG: KeycloakConfig
  private KEYCLOAK_INIT_OPTIONS: KeycloakInitOptions
  private KEYCLOAK_BEARER_EXCLUDED_URLS = ['assets']

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService,
    private appConfig: AppConfigService
  ) {}

  /*
      It seems like keycloak-angular is doing a bad job in resolving the promise
      in case the server throws an error / is not available.

      Bootstrapping of Angular would never finish without a timeout here.
      The happyTimeout is intended to let the reject happen a bit faster in case
      the network connection is not the bottleneck. The terminationTimeout would
      reject later to finally kill the app gracefully.
  */

  public initKeycloak(isTest: boolean = false): Promise<boolean> {
    /* Remove this, once authentication is ready to be used ---> */
    /////////////////////////
    // if (!isTest) {
    //   return Promise.resolve(true)
    // }
    /////////////////////////
    /* Remove this, once authentication is ready to be used <--- */

    let terminationTimer: number
    this.initVariables()

    return new Promise(async (resolve, reject) => {
      const happyTimeout = window.setTimeout(() => {
        this.isKeycloakHappy().catch(() => reject(this.ERROR_UNREACHABLE))
      }, this.HAPPY_TIMEOUT)

      const terminationTimeout = new Promise((_, onTimeout) => {
        terminationTimer = window.setTimeout(() => {
          onTimeout(this.ERROR_TIMEOUT)
        }, this.TERMINATION_TIMEOUT)
      })

      const init = this.keycloak.init({
        config: this.KEYCLOAK_CONFIG,
        initOptions: this.KEYCLOAK_INIT_OPTIONS,
        bearerExcludedUrls: this.KEYCLOAK_BEARER_EXCLUDED_URLS,
      })

      return Promise.race([init, terminationTimeout])
        .then(() => {
          clearTimeout(happyTimeout)
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

    this.TEST_URL = `${this.BASE_URL}/auth/realms/${this.REALM}`

    this.KEYCLOAK_CONFIG = {
      url: `${this.BASE_URL}/auth`,
      realm: `${this.REALM}`,
      clientId: `${this.CLIENT_ID}`,
    }

    this.KEYCLOAK_INIT_OPTIONS = {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    }
  }

  private isKeycloakHappy(): Promise<any> {
    return this.http.get<any>(this.TEST_URL).toPromise()
  }
}
