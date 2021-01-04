import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { GroupIndexPipe } from './pipes/group-index.pipe'
import { LayoutModule } from '../layout/layout.module'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { DirectivesModule } from './directives/directives.module'
import { SharedComponentsModule } from './components/shared-components.module'
import { ArchetypePipe } from './pipes/archetype.pipe'

const SHARED_MODULES = [
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  DirectivesModule,
  SharedComponentsModule,
]
const SHARED_DECLARATIONS = [GroupIndexPipe, ArchetypePipe]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [...SHARED_MODULES, CommonModule, LayoutModule],
  exports: [...SHARED_MODULES, ...SHARED_DECLARATIONS],
})
export class SharedModule {}
