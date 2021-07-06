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
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { ICohortApi } from 'src/app/shared/models/project/cohort-api.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

@Component({
  selector: 'num-patient-filter',
  templateUrl: './patient-filter.component.html',
  styleUrls: ['./patient-filter.component.scss'],
})
export class PatientFilterComponent implements OnInit {
  ageGraphData: IDictionary<number, number> = {}
  institutionGraphData: IDictionary<string, number> = {}
  determineHits: IDetermineHits = {
    defaultMessage: 'AQL.HITS.MESSAGE_SET_ALL_PARAMETERS',
    count: null,
  }
  patientCount$: Observable<number>
  project = new ProjectUiModel()

  get cohortNode(): CohortGroupUiModel {
    return this.project.cohortGroup
  }

  constructor(
    private cohortService: CohortService,
    private patientFilterService: PatientFilterService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.patientCount$ = this.patientFilterService.totalDatasetCountObservable$

    this.patientFilterService.getAllDatasetCount().subscribe()
  }

  private updateDetermineHits(count?: number | null, message?: string, isLoading = false): void {
    this.determineHits = {
      defaultMessage: this.determineHits.defaultMessage,
      message,
      count,
      isLoading,
    }
  }

  async determineCohortSize(): Promise<void> {
    if (!this.cohortNode) {
      this.updateDetermineHits(null, '', true)
    } else {
      try {
        const cohortGroupApi = this.cohortNode.convertToApi()

        const [result] = await Promise.all([
          this.cohortService.getSize(cohortGroupApi).toPromise(),
          this.getGraphsData(),
        ])
        this.updateDetermineHits(result, '', false)
      } catch (error) {
        if (error.status === 451) {
          // *** Error 451 means too few hits ***
          this.updateDetermineHits(null, 'PROJECT.HITS.MESSAGE_ERROR_FEW_HITS')
        } else {
          this.updateDetermineHits(null, 'PROJECT.HITS.MESSAGE_ERROR_MESSAGE')
        }
      }
    }
  }

  async getGraphsData(): Promise<void> {
    if (!!this.cohortNode) {
      try {
        const cohort: ICohortApi = {
          cohortGroup: this.cohortNode.convertToApi(),
          id: null,
          name: 'Preview Cohort',
          projectId: this.project.id,
        }
        if (!!cohort.cohortGroup && !!cohort.cohortGroup.query) {
          const result = await this.projectService
            .getProjectPreview(cohort.cohortGroup.query.query, cohort, [])
            .toPromise()

          this.ageGraphData = this.generateAgeGraphData(result)
          this.institutionGraphData = this.generateInstitutionGraphData(result)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  private generateAgeGraphData(rawData: string): IDictionary<number, number> {
    return {
      35: 100,
    }
  }

  private generateInstitutionGraphData(rawData: string): IDictionary<string, number> {
    return {
      charite: 200,
    }
  }
}
