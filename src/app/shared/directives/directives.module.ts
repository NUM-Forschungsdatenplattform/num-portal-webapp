import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UserHasRoleDirective } from './user-has-role.directive'
import { TooltipNecessaryDirective } from './tooltip-necessary/tooltip-necessary.directive'

@NgModule({
  declarations: [UserHasRoleDirective, TooltipNecessaryDirective],
  imports: [CommonModule],
  exports: [UserHasRoleDirective, TooltipNecessaryDirective],
})
export class DirectivesModule {}
