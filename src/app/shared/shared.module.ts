import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { UserHasRoleDirective } from './directives/user-has-role.directive'

@NgModule({
  declarations: [UserHasRoleDirective],
  imports: [CommonModule, FormsModule],
  exports: [TranslateModule, FormsModule, UserHasRoleDirective],
})
export class SharedModule {}
