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
import { AuthGuard } from './core/auth/guards/auth.guard'
import { RoleGuard } from './core/auth/guards/role.guard'
import { CanDeactivateSearchGuard } from './modules/search/can-deactivate-search.guard'
import { AvailableRoles } from './shared/models/available-roles.enum'
import { UserManualUrlResolver } from './shared/resolvers/usermanualurl.resolver'

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
    path: 'profile',
    canLoad: [AuthGuard],
    data: {
      navId: 'profile',
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Profile.Module" */ './modules/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'search',
    canLoad: [RoleGuard, AuthGuard],
    canDeactivate: [CanDeactivateSearchGuard],
    data: {
      navId: 'search',
      roles: [AvailableRoles.Manager, AvailableRoles.StudyCoordinator],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Search.Module" */ './modules/search/search.module').then(
        (m) => m.SearchModule
      ),
  },
  {
    path: 'projects',
    canLoad: [RoleGuard, AuthGuard],
    data: {
      navId: 'projects',
      roles: [AvailableRoles.StudyCoordinator, AvailableRoles.StudyApprover],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Projects.Module" */ './modules/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
  },
  {
    path: 'data-explorer',
    canLoad: [RoleGuard, AuthGuard],
    data: {
      navId: 'data-explorer',
      roles: [AvailableRoles.Researcher],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "DataExplorer.Module" */ './modules/data-explorer/data-explorer.module'
      ).then((m) => m.DataExplorerModule),
  },
  {
    path: 'aqls',
    canLoad: [RoleGuard, AuthGuard],
    data: {
      navId: 'aqls',
      roles: [AvailableRoles.CriteriaEditor, AvailableRoles.SuperAdmin],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Aqls.Module" */ './modules/aqls/aqls.module').then(
        (m) => m.AqlsModule
      ),
  },
  {
    path: 'users',
    canLoad: [RoleGuard, AuthGuard],
    data: {
      navId: 'users',
      roles: [AvailableRoles.OrganizationAdmin, AvailableRoles.SuperAdmin],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "UserManagement.Module" */ './modules/user-management/user-management.module'
      ).then((m) => m.UserManagementModule),
  },
  {
    path: 'organizations',
    canLoad: [RoleGuard, AuthGuard],
    data: {
      navId: 'organizations',
      roles: [AvailableRoles.OrganizationAdmin, AvailableRoles.SuperAdmin],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "OrganizationManagement.Module" */ './modules/organization-management/organization-management.module'
      ).then((m) => m.OrganizationManagementModule),
  },
  {
    path: 'content-editor',
    canLoad: [RoleGuard, AuthGuard],
    data: {
      navId: 'content-editor',
      roles: [AvailableRoles.ContentAdmin],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "ContentEditor.Module" */ './modules/content-editor/content-editor.module'
      ).then((m) => m.ContentEditorModule),
  },
  {
    path: 'manager-tools',
    canLoad: [RoleGuard, AuthGuard],
    data: {
      navId: 'manager-tools',
      roles: [AvailableRoles.Manager],
      onlyApprovedUsers: true,
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "ManagerTools.Module" */ './modules/manager-tools/manager-tools.module'
      ).then((m) => m.ManagerToolsModule),
  },
  {
    path: 'user-manual',
    resolve: { url: UserManualUrlResolver },
    canLoad: [RoleGuard],
    data: {
      navId: 'user-manual',
    },
    children: [],
  },
  {
    path: 'legal',
    loadChildren: () =>
      import(/* webpackChunkName: "Legal.Module" */ './modules/legal/legal.module').then(
        (m) => m.LegalModule
      ),
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
