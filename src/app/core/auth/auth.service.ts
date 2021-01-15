import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { OAuthService, UserInfo } from 'angular-oauth2-oidc'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AppConfigService } from 'src/app/config/app-config.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo: UserInfo = { sub: undefined }
  private userInfoSubject$ = new BehaviorSubject(this.userInfo)
  public userInfoObservable$ = this.userInfoSubject$.asObservable()

  constructor(
    private oauthService: OAuthService,
    private appConfig: AppConfigService,
    private httpClient: HttpClient
  ) {
    this.initTokenHandling()
  }

  private initTokenHandling(): void {
    this.oauthService.events.subscribe((event) => {
      if (event.type === 'token_received') {
        this.fetchUserInfo()
      }
    })
  }

  public get isLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()
  }

  public login(): void {
    this.oauthService.initCodeFlow()
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

  fetchUserInfo(): void {
    if (!this.isLoggedIn) {
      return
    }
    this.oauthService.loadUserProfile().then((userInfo: UserInfo) => {
      if (this.userInfo.sub !== userInfo.sub) {
        this.createUser(userInfo.sub).subscribe()

        this.userInfo = userInfo
        this.userInfoSubject$.next(userInfo)
      }
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
