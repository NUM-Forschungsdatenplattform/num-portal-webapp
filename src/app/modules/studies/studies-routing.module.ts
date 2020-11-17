import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { StudiesComponent } from './components/studies/studies.component'
import { StudyEditorComponent } from './components/study-editor/study-editor.component'
import { StudyResolver } from './study.resolver'

const routes: Routes = [
  {
    path: ':id/editor',
    component: StudyEditorComponent,
    resolve: { resolvedData: StudyResolver },
    data: {
      tabNavId: 'editor',
    },
  },
  {
    path: '',
    component: StudiesComponent,
    data: {
      tabNavId: 'overview',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudiesRoutingModule {}
