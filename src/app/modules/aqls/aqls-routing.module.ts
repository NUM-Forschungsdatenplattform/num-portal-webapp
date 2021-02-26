import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AqlResolver } from './aql.resolver'
import { AqlEditorComponent } from './components/aql-editor/aql-editor.component'
import { AqlsComponent } from './components/aqls/aqls.component'

const routes: Routes = [
  {
    path: ':id/editor',
    component: AqlEditorComponent,
    resolve: { resolvedData: AqlResolver },
    data: {
      tabNavId: 'editor',
    },
  },
  {
    path: '',
    component: AqlsComponent,
    data: {
      tabNavId: 'overview',
    },
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AqlsRoutingModule {}
