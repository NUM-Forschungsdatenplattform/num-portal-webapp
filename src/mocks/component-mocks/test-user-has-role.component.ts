import { Component } from '@angular/core'
@Component({
  template: `<div *myCustomIf="allowedRoles">
    <p>Researcher Content</p>
  </div>`,
})
export class TestUserHasRoleComponent {
  allowedRoles: string[] = ['Researcher']
}
