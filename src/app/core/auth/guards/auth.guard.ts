import { Injectable } from '@angular/core'
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { OAuthService } from 'angular-oauth2-oidc'
import { filter, map, take } from 'rxjs/operators'
import { ToastMessageType } from '../../../shared/models/toast-message-type.enum'
import { ProfileService } from '../../services/profile/profile.service'
import { ToastMessageService } from '../../services/toast-message/toast-message.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private oauthService: OAuthService,
    private profileService: ProfileService,
    private toast: ToastMessageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const redirectUri = window.location.origin + state.url
    return this.isAllowed(route, redirectUri)
  }

  canLoad(route: Route): Promise<boolean> {
    const redirectUri = window.location.origin + '/' + route.path
    return this.isAllowed(route, redirectUri)
  }

  async isAllowed(route: ActivatedRouteSnapshot | Route, redirectUri: string): Promise<boolean> {
    const onlyApprovedUsers: boolean = route.data?.onlyApprovedUsers

    const isLoggedIn =
      this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()

    if (isLoggedIn) {
      if (!onlyApprovedUsers) {
        return Promise.resolve(true)
      }
      if (this.profileService.userNotApproved) {
        this.toast.openToast({
          type: ToastMessageType.Warn,
          message: 'APPLAYOUT.INFO.UNAPPROVED_USER_MESSAGE_DESCRIPTION',
        })
      }
      return this.profileService.userProfileObservable$
        .pipe(
          filter((profile) => !!profile.id),
          take(1),
          map((profile) => profile.approved)
        )
        .toPromise()
    }

    return this.oauthService.loadDiscoveryDocumentAndLogin({ customRedirectUri: redirectUri })
  }
}
