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
import { RoleGuard } from './core/auth/guards/role.guard'
import { AvailableRoles } from './shared/models/available-roles.enum'

export const routes: Routes = [
  {
    path: 'home',
    data: {
      navId: 'home',
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Dashboard.Module" */ './modules/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'projects',
    canLoad: [RoleGuard],
    data: {
      navId: 'projects',
      roles: [AvailableRoles.StudyCoordinator, AvailableRoles.StudyApprover],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Projects.Module" */ './modules/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
  },
  {
    path: 'data-explorer',
    canLoad: [RoleGuard],
    data: {
      navId: 'data-explorer',
      roles: [AvailableRoles.Researcher],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "DataExplorer.Module" */ './modules/data-explorer/data-explorer.module'
      ).then((m) => m.DataExplorerModule),
  },
  {
    path: 'phenotypes',
    canLoad: [RoleGuard],
    data: {
      navId: 'phenotypes',
      roles: [AvailableRoles.StudyCoordinator],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Phenotypes.Module" */ './modules/phenotypes/phenotypes.module'
      ).then((m) => m.PhenotypesModule),
  },
  {
    path: 'aqls',
    canLoad: [RoleGuard],
    data: {
      navId: 'aqls',
      roles: [AvailableRoles.Researcher, AvailableRoles.StudyCoordinator],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Aqls.Module" */ './modules/aqls/aqls.module').then(
        (m) => m.AqlsModule
      ),
  },
  {
    path: 'users',
    canLoad: [RoleGuard],
    data: {
      navId: 'users',
      roles: [AvailableRoles.OrganizationAdmin, AvailableRoles.SuperAdmin],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "UserManagement.Module" */ './modules/user-management/user-management.module'
      ).then((m) => m.UserManagementModule),
  },
  {
    path: 'organizations',
    canLoad: [RoleGuard],
    data: {
      navId: 'organizations',
      roles: [AvailableRoles.OrganizationAdmin, AvailableRoles.SuperAdmin],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "OrganizationManagement.Module" */ './modules/organization-management/organization-management.module'
      ).then((m) => m.OrganizationManagementModule),
  },
  {
    path: 'content-editor',
    canLoad: [RoleGuard],
    data: {
      navId: 'content-editor',
      roles: [AvailableRoles.ContentAdmin],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "ContentEditor.Module" */ './modules/content-editor/content-editor.module'
      ).then((m) => m.ContentEditorModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
