import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './components/profile/profile.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DialogSaveProfileComponent } from './components/dialog-save-profile/dialog-save-profile.component'
import { DialogDiscardProfileComponent } from './components/dialog-discard-profile/dialog-discard-profile.component'

@NgModule({
  declarations: [ProfileComponent, DialogSaveProfileComponent, DialogDiscardProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, LayoutModule],
})
export class ProfileModule {}
