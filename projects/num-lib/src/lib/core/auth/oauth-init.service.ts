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

import { Injectable } from '@angular/core'
import { AppConfigService } from '../../../../config/app-config.service'
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

    // eslint-disable-next-line
    return new Promise(async (resolve, reject) => {
      const terminationTimeout = new Promise((_, onTimeout) => {
        terminationTimer = window.setTimeout(() => {
          onTimeout(this.ERROR_TIMEOUT)
        }, this.TERMINATION_TIMEOUT)
      })

      this.oauthService.configure(this.AUTH_CONFIG)

      this.oauthService.setupAutomaticSilentRefresh()

      const init = this.oauthService
        .loadDiscoveryDocument()
        .then(async () => {
          await this.oauthService.tryLoginCodeFlow().catch(async () => {
            await this.oauthService.silentRefresh().catch(() => {
              return
            })
          })
        })
        .catch((_error) => {
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
      silentRefreshRedirectUri: window.location.origin + '/assets/silent-refresh.html',
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
