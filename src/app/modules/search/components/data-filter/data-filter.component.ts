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
import { ActivatedRoute, Router } from '@angular/router'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

@Component({
  selector: 'num-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss'],
})
export class DataFilterComponent implements OnInit {
  availableRoles = AvailableRoles
  currentProject: ProjectUiModel
  totalCohortSize: number
  hitCounter: IDictionary<string, number> = {}
  isHitCounterLoading: boolean
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientFilterService: PatientFilterService,
    private cohortService: CohortService
  ) {}

  ngOnInit(): void {
    this.currentProject = this.route.snapshot.data.resolvedData
    const { cohortGroup } = this.currentProject.convertToApiInterface()
    this.cohortService.getSize(cohortGroup, false).subscribe((size) => {
      this.totalCohortSize = size
    })
  }

  goToPatientFilter(): void {
    this.patientFilterService.setCurrentProject(this.currentProject)
    this.router.navigate(['search'], {})
  }

  gotToDataRetrival(): void {
    this.patientFilterService.setCurrentProject(this.currentProject)
    this.router.navigate(['search/data-explorer'], {})
  }

  gotToProject(): void {
    this.router.navigate(['projects/new/editor'], {
      state: { project: this.currentProject.convertToApiInterface() },
    })
  }

  determineHits(): void {
    this.isHitCounterLoading = true
    this.hitCounter = {}
    const { cohortGroup } = this.currentProject.convertToApiInterface()
    const templateIds = this.currentProject.templates.map((template) => template.templateId)
    this.cohortService.getSizeForTemplates(cohortGroup, templateIds).subscribe(
      (result) => {
        this.isHitCounterLoading = false
        this.hitCounter = result
      },
      (_) => {
        this.isHitCounterLoading = false
      }
    )
  }
}
