import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AqlsRoutingModule } from './aqls-routing.module'
import { AqlsComponent } from './components/aqls/aqls.component'
import { AqlTableComponent } from './components/aql-table/aql-table.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'

@NgModule({
  declarations: [AqlsComponent, AqlTableComponent],
  imports: [CommonModule, AqlsRoutingModule, SharedModule, LayoutModule],
})
export class AqlsModule {}
