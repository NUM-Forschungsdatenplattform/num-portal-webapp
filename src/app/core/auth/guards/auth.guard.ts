import { Injectable } from '@angular/core'
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private oauthService: OAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const redirectUri = window.location.origin + state.url
    return this.isAllowed(route, redirectUri)
  }

  canLoad(route: Route): Promise<boolean> {
    const redirectUri = window.location.origin + '/' + route.path
    return this.isAllowed(route, redirectUri)
  }

  async isAllowed(route: ActivatedRouteSnapshot | Route, redirectUri: string): Promise<boolean> {
    const isLoggedIn =
      this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()

    if (isLoggedIn) {
      return Promise.resolve(true)
    }

    return this.oauthService.loadDiscoveryDocumentAndLogin({ customRedirectUri: redirectUri })
  }
}
