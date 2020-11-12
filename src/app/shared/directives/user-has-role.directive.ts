import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'
import { KeycloakService } from 'keycloak-angular'

@Directive({
  selector: '[userHasRole]',
})
export class UserHasRoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private keycloak: KeycloakService
  ) {}

  @Input() set userHasRole(allowedRoles: string[]) {
    const userRoles = this.keycloak.getUserRoles(true)

    if (allowedRoles) {
      if (allowedRoles.some((role) => userRoles.indexOf(role) >= 0)) {
        this.viewContainer.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainer.clear()
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }
}
