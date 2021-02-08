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
    path: 'studies',
    canLoad: [RoleGuard],
    data: {
      navId: 'studies',
      roles: [AvailableRoles.StudyCoordinator, AvailableRoles.StudyApprover],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Studies.Module" */ './modules/studies/studies.module').then(
        (m) => m.StudiesModule
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
      import(/* webpackChunkName: "Admin.Module" */ './modules/admin/admin.module').then(
        (m) => m.AdminModule
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
