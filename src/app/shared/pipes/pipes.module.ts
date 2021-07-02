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
import { ArchetypePipe } from './archetype.pipe'
import { GroupIndexPipe } from './group-index.pipe'
import { NestedAccessPipe } from './nested-access.pipe'
import { IsSelectedPipe } from './is-selected.pipe'
import { ProjectMenuPipe } from './project-menu.pipe'
import { LocalizedDatePipe } from './localized-date.pipe'
import { AqlMenuPipe } from './aql-menu.pipe'
import { AvailableRolesPipe } from './available-roles.pipe'

const SHARED_DECLARATIONS = [
  GroupIndexPipe,
  ArchetypePipe,
  NestedAccessPipe,
  IsSelectedPipe,
  ProjectMenuPipe,
  AqlMenuPipe,
  LocalizedDatePipe,
  AvailableRolesPipe,
]

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [CommonModule],
  exports: [...SHARED_DECLARATIONS],
})
export class PipesModule {}
