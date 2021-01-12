import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { AuthService } from 'src/app/core/auth/auth.service'

@Directive({
  selector: '[numUserHasRole]',
})
export class UserHasRoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private oauthService: OAuthService,
    private authService: AuthService
  ) {}

  @Input() set numUserHasRole(allowedRoles: string[]) {
    let userRoles: string[] = []

    if (this.authService.isLoggedIn) {
      this.oauthService.loadUserProfile().then((userinfo) => {
        userRoles = userinfo.groups

        if (allowedRoles && allowedRoles.length) {
          if (userRoles && userRoles.length) {
            if (allowedRoles.some((role) => userRoles.indexOf(role) >= 0)) {
              this.viewContainer.createEmbeddedView(this.templateRef)
            } else {
              this.viewContainer.clear()
            }
          } else {
            this.viewContainer.clear()
          }
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef)
        }
      })
    } else {
      if (!allowedRoles) {
        this.viewContainer.createEmbeddedView(this.templateRef)
      }
    }
  }
}
