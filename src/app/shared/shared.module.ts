import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { GroupIndexPipe } from './pipes/group-index.pipe'
import { SearchComponent } from './components/search/search.component'
import { FilterChipsComponent } from './components/filter-chips/filter-chips.component'
import { LayoutModule } from '../layout/layout.module'

const SHARED_MODULES = [TranslateModule, FormsModule, ReactiveFormsModule]
const SHARED_DECLARATIONS = [GroupIndexPipe, SearchComponent, FilterChipsComponent]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [...SHARED_MODULES, CommonModule, LayoutModule],
  exports: [...SHARED_MODULES, ...SHARED_DECLARATIONS],
})
export class SharedModule {}
