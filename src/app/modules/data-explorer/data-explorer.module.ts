import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DataExplorerComponent } from './components/data-explorer/data-explorer.component'
import { DataExplorerRoutingModule } from './data-explorer-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { DataExplorerStudiesComponent } from './components/data-explorer-studies/data-explorer-studies.component'
import { DataExplorerStudiesTableComponent } from './components/data-explorer-studies-table/data-explorer-studies-table.component'
import { SharedStudiesModule } from '../studies/shared-studies.module'
import { ResultTableComponent } from './components/result-table/result-table.component'

@NgModule({
  declarations: [
    DataExplorerComponent,
    DataExplorerStudiesComponent,
    DataExplorerStudiesTableComponent,
    ResultTableComponent,
  ],
  imports: [
    CommonModule,
    DataExplorerRoutingModule,
    SharedModule,
    LayoutModule,
    SharedStudiesModule,
  ],
})
export class DataExplorerModule {}
