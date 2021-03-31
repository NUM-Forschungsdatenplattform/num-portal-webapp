import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ImprintRoutingModule } from './imprint-routing.module'
import { ImprintComponent } from './components/imprint.component'

@NgModule({
  declarations: [ImprintComponent],
  imports: [CommonModule, ImprintRoutingModule],
})
export class ImprintModule {}
