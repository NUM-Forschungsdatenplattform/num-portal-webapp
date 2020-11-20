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
export class RoleGuard implements CanActivate, CanLoad {
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
    const allowedRoles = route.data?.roles

    if (!(allowedRoles instanceof Array) || allowedRoles.length === 0) {
      return Promise.resolve(true)
    }

    const isLoggedIn =
      this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()

    if (!isLoggedIn) {
      await this.oauthService.loadDiscoveryDocumentAndLogin({ customRedirectUri: redirectUri })
    }

    let userRoles: string[]
    await this.oauthService.loadUserProfile().then((userinfo) => {
      userRoles = userinfo.groups
    })

    if (userRoles) {
      return Promise.resolve(allowedRoles.some((role) => userRoles.indexOf(role) >= 0))
    }
    return Promise.resolve(false)
  }
}
