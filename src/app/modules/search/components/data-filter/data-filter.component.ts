import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { AvailableFeatures } from '../../../../shared/models/feature/available-features.enum'

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

  protected readonly AvailableFeatures = AvailableFeatures
}
