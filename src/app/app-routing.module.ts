import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './core/auth/guards/role.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import(
        /* webpackChunkName: "Dashboard.Module" */ './modules/dashboard/dashboard.module'
      ).then((m) => m.DashboardModule),
  },
  {
    path: 'studies',
    canActivate: [RoleGuard],
    loadChildren: () =>
      import('./modules/studies/studies.module'
      ).then(m => m.StudiesModule),
    data: {
      roles: ['test_role']
    },
  },
  {
    path: 'phenotypes',
    loadChildren: () =>
      import('./modules/phenotypes/phenotypes.module'
      ).then(m => m.PhenotypesModule)
  },
  {
    path: 'cohorts',
    loadChildren: () =>
      import('./modules/cohorts/cohorts.module'
    ).then(m => m.CohortsModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
