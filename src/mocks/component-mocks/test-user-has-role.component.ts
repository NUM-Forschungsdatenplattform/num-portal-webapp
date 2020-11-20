import { Component } from '@angular/core'
@Component({
  template: ` <div>
    <span *userHasRole="allowedRoles">Test content</span>
  </div>`,
})
export class TestUserHasRoleComponent {
  allowedRoles: string[] = []
}
