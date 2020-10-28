import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PhenotypeEditorComponent } from './components/phenotype-editor/phenotype-editor.component'
import { PhenotypesComponent } from './components/phenotypes/phenotypes.component'

const routes: Routes = [
  { path: '', component: PhenotypesComponent },
  { path: 'editor', component: PhenotypeEditorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhenotypesRoutingModule {}
