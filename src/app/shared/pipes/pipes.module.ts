import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ArchetypePipe } from './archetype.pipe'
import { GroupIndexPipe } from './group-index.pipe'
import { NestedAccessPipe } from './nested-access.pipe'
import { IsSelectedPipe } from './is-selected.pipe'
import { ProjectMenuPipe } from './project-menu.pipe'
import { LocalizedDatePipe } from './localized-date.pipe'
import { AqlMenuPipe } from './aql-menu.pipe'
import { AvailableRolesPipe } from './available-roles.pipe'
import { ObjectToArrayPipe } from './object-to-array.pipe'

const SHARED_DECLARATIONS = [
  GroupIndexPipe,
  ArchetypePipe,
  NestedAccessPipe,
  IsSelectedPipe,
  ProjectMenuPipe,
  AqlMenuPipe,
  LocalizedDatePipe,
  AvailableRolesPipe,
  ObjectToArrayPipe,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [CommonModule],
  exports: [...SHARED_DECLARATIONS],
})
export class PipesModule {}
