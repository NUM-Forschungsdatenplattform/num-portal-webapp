import { Injectable } from '@angular/core'
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad {
  constructor(private oauthService: OAuthService, private authService: AuthService) {}

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

    if (!this.authService.isLoggedIn) {
      this.authService.login()
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
