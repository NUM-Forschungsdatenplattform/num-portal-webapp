import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AqlService } from './services/aql.service'
import { CohortService } from './services/cohort.service'
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component'
import { LayoutModule } from '../layout/layout.module'
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [GenericDialogComponent],
  providers: [AqlService, CohortService],
  imports: [CommonModule, LayoutModule, SharedModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core should only be imported to AppModule. It is already in place')
    }
  }
}
