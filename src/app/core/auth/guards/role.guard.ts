import { Injectable } from '@angular/core'
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad {
  userRoles: string[] = []

  constructor(private authService: AuthService) {
    this.authService.userInfoObservable$.subscribe((user: any) => (this.userRoles = user.groups))
  }

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

    if (this.userRoles) {
      return Promise.resolve(allowedRoles.some((role) => this.userRoles.indexOf(role) >= 0))
    }

    return Promise.resolve(false)
  }
}
