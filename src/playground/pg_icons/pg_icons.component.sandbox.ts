import { sandboxOf } from 'angular-playground'
import { PgIconsComponent } from './pg_icons.component'

export default sandboxOf(PgIconsComponent).add('Icons', {
  template: `<div class="mat-drawer-container"><num-pg-icons></num-pg-icons></div>`,
})
