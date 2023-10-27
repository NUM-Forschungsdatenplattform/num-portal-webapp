/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AqlService } from '../../../../core/services/aql/aql.service'
import { IDetermineHits } from '../../../../shared/components/editor-determine-hits/determine-hits.interface'
import { IAqlFilter } from '../../../../shared/models/aql/aql-filter.interface'
import { CohortGroupUiModel } from '../../../../shared/models/project/cohort-group-ui.model'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'

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
