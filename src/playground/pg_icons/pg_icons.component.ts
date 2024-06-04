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
