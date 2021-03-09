import { Component } from '@angular/core'
import { CUSTOM_ICONS } from 'src/app/layout/custom-icons'
import { FONT_AWESOME_ICONS } from 'src/app/layout/font-awesome-icons'

@Component({
  selector: 'num-pg-icons',
  templateUrl: './pg_icons.component.html',
  styleUrls: ['./pg_icons.component.scss'],
})
export class PgIconsComponent {
  icons = [...FONT_AWESOME_ICONS, ...CUSTOM_ICONS].map((icon) => icon.iconName)
  constructor() {}
}
