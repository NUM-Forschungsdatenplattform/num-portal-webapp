import { Injectable } from '@angular/core'
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router'
import { from, Observable } from 'rxjs'
import { of } from 'rxjs'
import { catchError, filter, map, take, timeout } from 'rxjs/operators'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanLoad {
  userInfo: IAuthUserInfo

  constructor(private authService: AuthService, private router: Router) {
    this.authService.userInfoObservable$.subscribe((user: IAuthUserInfo) => {
      this.userInfo = user
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const redirectUri = window.location.origin + state.url
    return this.isAllowed(route, redirectUri)
  }

  canLoad(route: Route): Observable<boolean> {
    const redirectUri = window.location.origin + '/' + route.path
    return this.isAllowed(route, redirectUri)
  }

  isAllowed(route: ActivatedRouteSnapshot | Route, redirectUri: string): Observable<boolean> {
    const allowedRoles = route.data?.roles

    if (!(allowedRoles instanceof Array) || allowedRoles.length === 0) {
      return of(true)
    }

    if (!this.authService.isLoggedIn) {
      this.authService.login(redirectUri)
      return of(false)
    }

    if (this.userInfo.groups) {
      const result = allowedRoles.some((role) => this.userInfo.groups.indexOf(role) >= 0)
      return result ? of(true) : from(this.router.navigate(['/home']))
    }

    return this.authService.userInfoObservable$.pipe(
      filter((user) => user.sub !== undefined),
      take(1),
      map((userInfo) => {
        const result = allowedRoles.some((role) => userInfo.groups?.indexOf(role) >= 0)
        if (result) {
          return true
        } else {
          throw new Error('Not allowed')
        }
      }),
      timeout(2000),
      catchError(() => {
        this.router.navigate(['/home'])
        return of(false)
      })
    )
  }
}
