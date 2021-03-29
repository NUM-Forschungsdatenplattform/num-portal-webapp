import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DataExplorerComponent } from './components/data-explorer/data-explorer.component'
import { DataExplorerRoutingModule } from './data-explorer-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DataExplorerProjectsComponent } from './components/data-explorer-projects/data-explorer-projects.component'
import { DataExplorerProjectsTableComponent } from './components/data-explorer-projects-table/data-explorer-projects-table.component'
import { SharedProjectsModule } from '../projects/shared-projects.module'
import { ResultTableComponent } from './components/result-table/result-table.component'

@NgModule({
  declarations: [
    DataExplorerComponent,
    DataExplorerProjectsComponent,
    DataExplorerProjectsTableComponent,
    ResultTableComponent,
  ],
  imports: [
    CommonModule,
    DataExplorerRoutingModule,
    SharedModule,
    LayoutModule,
    SharedProjectsModule,
  ],
})
export class DataExplorerModule {}
