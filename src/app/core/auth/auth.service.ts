import { Injectable } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {}

  public isLoggedIn = this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()

  public login(): void {
    this.oauthService.initCodeFlow()
  }

  public logout(): void {
    this.oauthService.logOut()
  }
}
