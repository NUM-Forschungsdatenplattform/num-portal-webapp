import { sandboxOf } from 'angular-playground'
import { TypographyComponent } from './pg_typography.component'

export default sandboxOf(TypographyComponent).add('Typography', {
  template: `<div class="mat-drawer-container"><num-pg-typography></num-pg-typography></div>`,
})
