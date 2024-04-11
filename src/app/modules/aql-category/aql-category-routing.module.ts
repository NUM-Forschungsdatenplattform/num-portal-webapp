import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { AqlCategoriesManagementComponent } from './components/aql-categories-management/aql-categories-management.component'

const routes: Route[] = [
  {
    path: '',
    component: AqlCategoriesManagementComponent,
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AQLCategoryRoutingModule {}
