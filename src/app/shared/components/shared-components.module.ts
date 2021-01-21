import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslateModule } from '@ngx-translate/core'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FilterChipsComponent } from './filter-chips/filter-chips.component'
import { SearchComponent } from './search/search.component'
import { FilterTableComponent } from './filter-table/filter-table.component'
import { PipesModule } from '../pipes/pipes.module'
import { DefinitionListComponent } from './definition-list/definition-list.component'
import { FilterSelectComponent } from './filter-select/filter-select.component'

const SHARED_DECLARATIONS = [
  SearchComponent,
  FilterChipsComponent,
  ButtonComponent,
  FilterTableComponent,
  DefinitionListComponent,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS, DefinitionListComponent, FilterSelectComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
  ],
  exports: [...SHARED_DECLARATIONS, FilterSelectComponent],
})
export class SharedComponentsModule {}
