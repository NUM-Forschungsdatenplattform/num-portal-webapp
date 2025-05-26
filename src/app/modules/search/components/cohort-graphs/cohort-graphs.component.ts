import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { ICohortPreviewApi } from 'src/app/shared/models/cohort-preview.interface'
import { FlexModule } from '@angular/flex-layout/flex'
import { EditorDetermineHitsComponent } from '../../../../shared/components/editor-determine-hits/editor-determine-hits.component'
import { MatDivider } from '@angular/material/list'
import { UserHasRoleDirective } from '../../../../shared/directives/user-has-role.directive'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { VerticalBarChartComponent } from '../vertical-bar-chart/vertical-bar-chart.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-cohort-graphs',
  templateUrl: './cohort-graphs.component.html',
  styleUrls: ['./cohort-graphs.component.scss'],
  imports: [
    FlexModule,
    EditorDetermineHitsComponent,
    MatDivider,
    UserHasRoleDirective,
    MatProgressSpinner,
    VerticalBarChartComponent,
    TranslatePipe,
  ],
})
export class CohortGraphsComponent {
  @Input() determineHits: IDetermineHits
  @Input() isChartDataLoading: boolean
  @Input() isCohortValid: any
  @Input() previewData: ICohortPreviewApi
  @Output() determine = new EventEmitter<void>()

  availableRoles = AvailableRoles

  constructor() {}
}
