import { Component } from '@angular/core'
import { FONT_AWESOME_ICONS } from 'src/app/layout/font-awesome-icons'

@Component({
  selector: 'num-pg-icons',
  templateUrl: './pg_icons.component.html',
  styleUrls: ['./pg_icons.component.scss'],
})
export class PgIconsComponent {
  icons = FONT_AWESOME_ICONS.map((icon) => icon.iconName)
  constructor() {}
}
