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

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core'
import { Keepalive } from '@ng-idle/keepalive'
import { OAuthService } from 'angular-oauth2-oidc'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { IAuthUserProfile } from 'src/app/shared/models/user/auth-user-profile.interface'
import { ProfileService } from '../services/profile/profile.service'

const TIME_BEFORE_START_IDLE = 1
const TIME_TO_WAIT_IDLE = 3600

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo: IAuthUserInfo = { sub: undefined }
  private userInfoSubject$ = new BehaviorSubject(this.userInfo)
  public userInfoObservable$ = this.userInfoSubject$.asObservable()
  public timedOut = false
  public lastPing?: Date = null

  constructor(
    private oauthService: OAuthService,
    private profileService: ProfileService,
    private appConfig: AppConfigService,
    private httpClient: HttpClient,
    private router: Router,
    public idle: Idle,
    private keepAlive: Keepalive,
  ) {
    if (this.isLoggedIn) {
      this.initIdle()
    }
  }

  public initTokenHandling(): void {
    if (this.oauthService.state) {
      const url = new URL(decodeURIComponent(this.oauthService.state))
      this.router.navigate([url.pathname])
      this.oauthService.state = null
    }
    this.oauthService.events.subscribe((event) => {
      if (event.type === 'token_received') {
        this.fetchUserInfo()
      }
    })
  }

  public initIdle(): void {
    this.idle.setIdle(TIME_BEFORE_START_IDLE)
    this.idle.setTimeout(TIME_TO_WAIT_IDLE)
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES)
    this.idle.onIdleEnd.subscribe(() => {
      this.resetIdle()
    })
    this.idle.onTimeout.subscribe(() => {
      this.timedOut = true
      this.logout()
    })

    this.keepAlive.interval(TIME_TO_WAIT_IDLE)
    this.keepAlive.onPing.subscribe(() => (this.lastPing = new Date()))
    this.resetIdle()
  }

  public get isLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()
  }

  public login(redirectUri?: string): void {
    this.oauthService.initCodeFlow(redirectUri)
  }

  public logout(): void {
    this.clearUserInfo()
    this.oauthService.logOut()
  }

  public resetIdle(): void {
    this.idle.watch()
    this.timedOut = false
  }

  public createUser(userId: string): Observable<any> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<any>(
        `${this.appConfig.config.api.baseUrl}/admin/user/${userId}`,
        undefined,
        httpOptions,
      )
      .pipe(catchError(() => of()))
  }

  async fetchUserInfo(): Promise<void> {
    if (!this.isLoggedIn) {
      return
    }

    let userInfo: IAuthUserProfile

    try {
      userInfo = await this.oauthService.loadUserProfile()
    } catch (error) {
      this.clearUserInfo()
      throw new Error('Failed to fetch userInfo')
    }

    if (this.userInfo.sub !== userInfo?.info?.sub) {
      await this.createUser(userInfo.info.sub)
        .toPromise()
        .finally(() => {
          if (!this.idle.isIdling()) {
            this.initIdle()
          }
        })
    }

    this.userInfo = userInfo.info
    this.userInfoSubject$.next(this.userInfo)

    this.profileService.get().subscribe()
  }

  private clearUserInfo(): void {
    this.userInfo = { sub: undefined }
    this.userInfoSubject$.next(this.userInfo)
  }
}
