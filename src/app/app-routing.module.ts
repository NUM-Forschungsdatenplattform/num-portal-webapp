import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RoleGuard } from './core/auth/guards/role.guard'

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
    path: 'users',
    canLoad: [RoleGuard],
    data: {
      navId: 'users',
      roles: ['ORGANIZATION_ADMIN', 'SUPER_ADMIN'],
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
