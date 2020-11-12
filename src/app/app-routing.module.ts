import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RoleGuard } from './core/auth/guards/role.guard'
import { AuthGuard } from './core/auth/guards/auth.guard'

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
    canLoad: [AuthGuard, RoleGuard],
    data: {
      navId: 'studies',
      roles: ['Organization Admin', 'Study Coordinator', 'Researcher'],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Studies.Module" */ './modules/studies/studies.module').then(
        (m) => m.StudiesModule
      ),
  },
  {
    path: 'phenotypes',
    canLoad: [AuthGuard, RoleGuard],
    data: {
      navId: 'phenotypes',
      roles: ['Organization Admin', 'Study Coordinator', 'Researcher'],
    },
    loadChildren: () =>
      import(
        /* webpackChunkName: "Phenotypes.Module" */ './modules/phenotypes/phenotypes.module'
      ).then((m) => m.PhenotypesModule),
  },
  {
    path: 'cohorts',
    canLoad: [AuthGuard, RoleGuard],
    data: {
      navId: 'cohorts',
      roles: ['Organization Admin', 'Study Coordinator', 'Researcher'],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Cohorts.Module" */ './modules/cohorts/cohorts.module').then(
        (m) => m.CohortsModule
      ),
  },
  {
    path: 'aqls',
    canLoad: [AuthGuard, RoleGuard],
    data: {
      navId: 'aqls',
      roles: ['Organization Admin', 'Study Coordinator', 'Researcher'],
    },
    loadChildren: () =>
      import(/* webpackChunkName: "Aqls.Module" */ './modules/aqls/aqls.module').then(
        (m) => m.AqlsModule
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
