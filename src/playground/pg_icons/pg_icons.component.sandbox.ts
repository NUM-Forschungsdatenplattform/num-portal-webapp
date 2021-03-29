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

import { sandboxOf } from 'angular-playground'
import { PgIconsComponent } from './pg_icons.component'

export default sandboxOf(PgIconsComponent).add('Icons', {
  template: `<div class="mat-drawer-container"><num-pg-icons></num-pg-icons></div>`,
})
