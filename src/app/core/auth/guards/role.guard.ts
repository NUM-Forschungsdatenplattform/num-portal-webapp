import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad {

  constructor(private keycloak: KeycloakService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUri = window.location.origin + state.url;
    return this.isAllowed(route, redirectUri);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const redirectUri = segments.reduce((path, currentSegment) => {
      return `${path}/${currentSegment.path}`;
    }, '');
    return this.isAllowed(route, redirectUri);
  }

  async isAllowed(route: ActivatedRouteSnapshot | Route, redirectUri: string): Promise<boolean> {
    const allowedRoles = route.data.roles;
    const userRoles = this.keycloak.getUserRoles(true);
    const isLoggedIn = await this.keycloak.isLoggedIn();

    if (!isLoggedIn) {
      await this.keycloak.login({
        redirectUri,
      });
    }

    if (!(allowedRoles instanceof Array) || allowedRoles.length === 0) {
      return true;
    }

    return allowedRoles.some(role => userRoles.indexOf(role) >= 0);
  }
}
