import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProjectsComponent } from './components/projects/projects.component'
import { ProjectEditorComponent } from './components/project-editor/project-editor.component'
import { ProjectResolver } from './project.resolver'

const routes: Routes = [
  {
    path: ':id/editor',
    component: ProjectEditorComponent,
    resolve: { resolvedData: ProjectResolver },
    data: {
      tabNavId: 'editor',
    },
  },
  {
    path: '',
    component: ProjectsComponent,
    data: {
      tabNavId: 'overview',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
