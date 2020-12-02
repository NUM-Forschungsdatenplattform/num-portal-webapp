import { sandboxOf } from 'angular-playground'
import { PgButtonsComponent } from './pg_buttons.component'

export default sandboxOf(PgButtonsComponent).add('Buttons', {
  template: `<div class="mat-drawer-container"><num-pg-buttons></num-pg-buttons></div>`,
})
