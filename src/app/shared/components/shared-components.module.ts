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

const SHARED_DECLARATIONS = [SearchComponent, FilterChipsComponent, ButtonComponent]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [...SHARED_DECLARATIONS],
})
export class SharedComponentsModule {}
