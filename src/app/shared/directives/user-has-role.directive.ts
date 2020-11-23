import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'

@Directive({
  selector: '[numUserHasRole]',
})
export class UserHasRoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private oauthService: OAuthService
  ) {}

  @Input() set numUserHasRole(allowedRoles: string[]) {
    let userRoles: string[]
    this.oauthService.loadUserProfile().then((userinfo) => {
      userRoles = userinfo.groups

      if (userRoles) {
        if (allowedRoles) {
          if (allowedRoles.some((role) => userRoles.indexOf(role) >= 0)) {
            this.viewContainer.createEmbeddedView(this.templateRef)
          } else {
            this.viewContainer.clear()
          }
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef)
        }
      } else {
        this.viewContainer.clear()
      }
    })
  }
}
