import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { BehaviorSubject, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AdminService } from '../services/admin.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfo: any = {}
  private userInfoSubject$ = new BehaviorSubject(this.userInfo)
  public userInfoObservable$ = this.userInfoSubject$.asObservable()

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {
    console.log('Hello World from auth Service')
    this.initTokenHandling()
  }
  public get isLoggedIn(): boolean {
    console.log('loggedIN?')
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()
  }

  private initTokenHandling(): void {
    this.oauthService.events.subscribe((event) => {
      if (event.type === 'token_received') {
        this.fetchUserInfo()
      }
    })
  }

  public login(): void {
    this.oauthService.initCodeFlow()
  }

  public logout(): void {
    this.clearUserInfo()
    this.oauthService.logOut()
  }

  createUser(userId: string): void {
    console.log(userId)
  }

  // createUser(userId: string): Observable<any> {
  //   return this.httpClient.post<any>(`${this.baseUrl}/user/${userId}`, undefined).pipe(
  //     catchError((error) => {
  //       if (error.status !== 409) {
  // TODO: Check if this check is working
  //         return this.handleError(error)
  //       }
  //     })
  //   )
  // }

  fetchUserInfo(): void {
    console.log(this.isLoggedIn)
    if (!this.isLoggedIn) {
      return
    }
    this.oauthService.loadUserProfile().then((userInfo) => {
      if (this.userInfo.sub !== userInfo.sub) {
        this.createUser(userInfo.sub)
      }

      this.userInfo = userInfo
      this.userInfoSubject$.next(userInfo)
    })
  }

  private clearUserInfo(): void {
    this.userInfo = {}
    this.userInfoSubject$.next(this.userInfo)
  }
}
