import { sandboxOf } from 'angular-playground'
import { PgTypographyComponent } from './pg_typography.component'

export default sandboxOf(PgTypographyComponent).add('Typography', {
  template: `<div class="mat-drawer-container"><num-pg-typography></num-pg-typography></div>`,
})
