import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { IAqlFilter } from 'src/app/shared/models/aql/aql-filter.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

@Component({
  selector: 'num-project-editor-cohort-builder',
  templateUrl: './project-editor-cohort-builder.component.html',
  styleUrls: ['./project-editor-cohort-builder.component.scss'],
})
export class ProjectEditorCohortBuilderComponent implements OnInit {
  private subscriptions = new Subscription()

  @Input() cohortNode: CohortGroupUiModel
  @Input() isLoadingComplete: boolean
  @Input() isDisabled: boolean
  @Input() isCohortValid: any

  @Input() determineHitsContent: IDetermineHits
  @Output() determineHitsClicked = new EventEmitter()

  filterConfig: IAqlFilter

  constructor(private aqlService: AqlService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.aqlService.filterConfigObservable$
        .pipe(take(1))
        .subscribe((config) => (this.filterConfig = config))
    )
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }

  handleSearchChange(): void {
    this.aqlService.setFilter(this.filterConfig)
  }
}
