/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AqlResolver } from './aql.resolver'
import { AqlEditorComponent } from './components/aql-editor/aql-editor.component'
import { AqlsComponent } from './components/aqls/aqls.component'
import { RoleGuard } from '../../core/auth/guards/role.guard'
import { AvailableRoles } from '../../shared/models/available-roles.enum'

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
