import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PhenotypesRoutingModule } from './phenotypes-routing.module'
import { PhenotypesComponent } from './components/phenotypes/phenotypes.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { PhenotypeEditorComponent } from './components/phenotype-editor/phenotype-editor.component'
import { PhenotypeTableComponent } from './components/phenotype-table/phenotype-table.component'
import { LayoutModule } from 'src/app/layout/layout.module'

@NgModule({
  declarations: [PhenotypesComponent, PhenotypeEditorComponent, PhenotypeTableComponent],
  imports: [CommonModule, PhenotypesRoutingModule, SharedModule, LayoutModule],
})
export class PhenotypesModule {}
