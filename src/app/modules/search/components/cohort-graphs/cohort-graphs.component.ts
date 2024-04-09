import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { ICohortPreviewApi } from 'src/app/shared/models/cohort-preview.interface'

@Component({
  selector: 'num-cohort-graphs',
  templateUrl: './cohort-graphs.component.html',
  styleUrls: ['./cohort-graphs.component.scss'],
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
