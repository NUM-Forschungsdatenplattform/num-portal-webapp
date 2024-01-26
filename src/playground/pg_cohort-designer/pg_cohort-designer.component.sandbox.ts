import { sandboxOf } from 'angular-playground'
import { CohortBuilderModule } from 'src/app/modules/cohort-builder/cohort-builder.module'
import { PgCohortDesignerComponent } from './pg_cohort-designer.component'

export default sandboxOf(PgCohortDesignerComponent, { imports: [CohortBuilderModule] }).add(
  'CohortDesigner',
  {
    template: `<num-pg-cohort-designer></num-pg-cohort-designer>`,
  },
)
