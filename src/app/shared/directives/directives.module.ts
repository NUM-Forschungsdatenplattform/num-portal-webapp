import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UserHasRoleDirective } from './user-has-role.directive'

@NgModule({
  declarations: [UserHasRoleDirective],
  imports: [CommonModule],
  exports: [UserHasRoleDirective],
})
export class DirectivesModule {}
