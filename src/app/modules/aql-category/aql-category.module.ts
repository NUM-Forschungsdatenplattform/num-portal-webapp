import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { AqlCategoriesTableComponent } from './components/aql-categories-table/aql-categories-table.component'
import { AQLCategoryRoutingModule } from './aql-category-routing.module'
import { DialogEditCategoryDetailsComponent } from './components/dialog-edit-category-details/dialog-edit-category-details.component'
import { AqlCategoriesManagementComponent } from './components/aql-categories-management/aql-categories-management.component'

@NgModule({
  declarations: [
    AqlCategoriesTableComponent,
    DialogEditCategoryDetailsComponent,
    AqlCategoriesManagementComponent,
  ],
  imports: [CommonModule, SharedModule, LayoutModule, AQLCategoryRoutingModule],
})
export class AqlCategoryModule {}
