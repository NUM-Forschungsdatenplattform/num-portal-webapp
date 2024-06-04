import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RoleGuard } from 'src/app/core/auth/guards/role.guard'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
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
    path: 'categories',
    canLoad: [RoleGuard],
    data: {
      tabNavId: 'aql-categories',
      roles: [AvailableRoles.Manager],
    },
    loadChildren: () =>
      /* webpackChunkName: "AQLCategory.Module" */ import(
        '../aql-category/aql-category.module'
      ).then((m) => m.AqlCategoryModule),
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
