import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CohortBuilderComponent } from './components/cohort-builder/cohort-builder.component'
import { AqlSelectionComponent } from './components/aql-selection/aql-selection.component'
import { AqlConnectorGroupComponent } from './components/aql-connector-group/aql-connector-group.component'
import { AqlConnectorItemComponent } from './components/aql-connector-item/aql-connector-item.component'
import { LayoutModule } from 'src/app/layout/layout.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { DialogAqlInfoComponent } from './components/dialog-aql-info/dialog-aql-info.component'

const SHARED_DECLARATIONS = [
  CohortBuilderComponent,
  AqlSelectionComponent,
  AqlConnectorGroupComponent,
  AqlConnectorItemComponent,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS, DialogAqlInfoComponent],
  imports: [CommonModule, LayoutModule, SharedModule],
  exports: [...SHARED_DECLARATIONS],
})
export class CohortBuilderModule {}
