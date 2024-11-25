import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { UserHasRoleDirective } from './user-has-role.directive'
import { TooltipNecessaryDirective } from './tooltip-necessary/tooltip-necessary.directive'
import { FeatureIsActiveDirective } from './feature-is-active.directive'

@NgModule({
  declarations: [UserHasRoleDirective, TooltipNecessaryDirective, FeatureIsActiveDirective],
  imports: [CommonModule],
  exports: [UserHasRoleDirective, TooltipNecessaryDirective, FeatureIsActiveDirective],
})
export class DirectivesModule {}
