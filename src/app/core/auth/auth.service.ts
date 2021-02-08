import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { ProfileService } from '../services/profile/profile.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo: IAuthUserInfo = { sub: undefined }
  private userInfoSubject$ = new BehaviorSubject(this.userInfo)
  public userInfoObservable$ = this.userInfoSubject$.asObservable()

  constructor(
    private oauthService: OAuthService,
    private profileService: ProfileService,
    private appConfig: AppConfigService,
    private httpClient: HttpClient,
    private router: Router
  ) {}

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

  private createUser(userId: string): Observable<any> {
    const httpOptions = {
      responseType: 'text' as 'json',
    }
    return this.httpClient
      .post<any>(
        `${this.appConfig.config.api.baseUrl}/admin/user/${userId}`,
        undefined,
        httpOptions
      )
      .pipe(catchError(this.handleError))
  }

  fetchUserInfo(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.isLoggedIn) {
        return resolve()
      }

      let userInfo

      try {
        userInfo = await this.oauthService.loadUserProfile()
      } catch (error) {
        this.clearUserInfo()
        return reject('Failed to fetch userInfo')
      }

      if (this.userInfo.sub !== userInfo?.sub) {
        await this.createUser(userInfo.sub).toPromise()
      }

      this.userInfo = userInfo
      this.userInfoSubject$.next(this.userInfo)

      this.profileService.get().subscribe()
    })
  }

  private clearUserInfo(): void {
    this.userInfo = { sub: undefined }
    this.userInfoSubject$.next(this.userInfo)
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error)
  }
}
