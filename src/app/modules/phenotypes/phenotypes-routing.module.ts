import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PhenotypeEditorComponent } from './components/phenotype-editor/phenotype-editor.component'
import { PhenotypesComponent } from './components/phenotypes/phenotypes.component'
import { PhenotypeResolver } from './phenotype.resolver'

const routes: Routes = [
  {
    path: ':id/editor',
    component: PhenotypeEditorComponent,
    resolve: { resolvedData: PhenotypeResolver },
    data: {
      tabNavId: 'editor',
    },
  },
  {
    path: '',
    component: PhenotypesComponent,
    data: {
      tabNavId: 'overview',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhenotypesRoutingModule {}
