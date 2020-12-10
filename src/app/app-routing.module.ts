import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from './core/auth/guards/auth.guard'
import { RoleGuard } from './core/auth/guards/role.guard'

export const routes: Routes = [
  {
    path: 'home',
    canLoad: [AuthGuard],
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
      roles: ['STUDY_COORDINATOR'],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Studies.Module" */ './modules/studies/studies.module').then(
        (m) => m.StudiesModule
      ),
  },
  {
    path: 'phenotypes',
    canLoad: [RoleGuard],
    data: {
      navId: 'phenotypes',
      roles: ['RESEARCHER', 'STUDY_COORDINATOR', 'ORGANIZATION_ADMIN'],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Phenotypes.Module" */ './modules/phenotypes/phenotypes.module'
      ).then((m) => m.PhenotypesModule),
  },
  {
    path: 'cohorts',
    canLoad: [RoleGuard],
    data: {
      navId: 'cohorts',
      roles: ['RESEARCHER', 'STUDY_COORDINATOR', 'ORGANIZATION_ADMIN'],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Cohorts.Module" */ './modules/cohorts/cohorts.module').then(
        (m) => m.CohortsModule
      ),
  },
  {
    path: 'aqls',
    canLoad: [RoleGuard],
    data: {
      navId: 'aqls',
      roles: ['RESEARCHER', 'STUDY_COORDINATOR', 'ORGANIZATION_ADMIN'],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Aqls.Module" */ './modules/aqls/aqls.module').then(
        (m) => m.AqlsModule
      ),
  },
  {
    path: 'admin',
    canLoad: [RoleGuard],
    data: {
      navId: 'admin',
      roles: ['ORGANIZATION_ADMIN'],
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
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
