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

import { Component } from '@angular/core'
import { CUSTOM_ICONS } from 'src/app/layout/custom-icons'
import {
  FONT_AWESOME_REGULAR_ICONS,
  FONT_AWESOME_SOLID_ICONS,
} from 'src/app/layout/font-awesome-icons'

@Component({
  selector: 'num-pg-icons',
  templateUrl: './pg_icons.component.html',
  styleUrls: ['./pg_icons.component.scss'],
})
export class PgIconsComponent {
  solidIcons = [...FONT_AWESOME_SOLID_ICONS, ...CUSTOM_ICONS].map((icon) => icon.iconName)
  regularIcons = [...FONT_AWESOME_REGULAR_ICONS].map((icon) => icon.iconName)
  constructor() {}
}
