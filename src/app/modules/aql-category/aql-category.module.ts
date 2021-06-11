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
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { AqlCategoriesTableComponent } from './components/aql-categories-table/aql-categories-table.component'
import { AQLCategoryRoutingModule } from './aql-category-routing.module'
import { MatPaginatorModule } from '@angular/material/paginator'
import { DialogEditCategoryDetailsComponent } from './components/dialog-edit-category-details/dialog-edit-category-details.component'
import { AqlCategoriesManagementComponent } from './components/aql-categories-management/aql-categories-management.component'

@NgModule({
  declarations: [
    AqlCategoriesTableComponent,
    DialogEditCategoryDetailsComponent,
    AqlCategoriesManagementComponent,
  ],
  imports: [CommonModule, SharedModule, LayoutModule, AQLCategoryRoutingModule, MatPaginatorModule],
})
export class AqlCategoryModule {}
