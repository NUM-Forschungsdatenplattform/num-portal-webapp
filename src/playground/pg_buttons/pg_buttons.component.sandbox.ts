import { sandboxOf } from 'angular-playground'
import { ButtonsComponent } from './pg_buttons.component'

export default sandboxOf(ButtonsComponent).add('Buttons', {
  template: `<div class="mat-drawer-container"><num-pg-buttons></num-pg-buttons></div>`,
})
