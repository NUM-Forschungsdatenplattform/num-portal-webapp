import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { IStudyResolved } from 'src/app/modules/studies/models/study-resolved.interface'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'

@Component({
  selector: 'num-data-explorer',
  templateUrl: './data-explorer.component.html',
  styleUrls: ['./data-explorer.component.scss'],
})
export class DataExplorerComponent implements OnInit {
  resolvedData: IStudyResolved
  isResearchersFetched: boolean
  isCohortsFetched: boolean

  isTemplatesDisabled = true
  isResearchersDisabled = true
  isGeneralInfoDisabled = true
  isConnectorDisabled = true

  generalInfoData: IDefinitionList[]

  get study(): StudyUiModel {
    return this.resolvedData.study
  }

  get cohortGroup(): CohortGroupUiModel {
    return this.study.cohortGroup
  }

  studyForm: FormGroup = new FormGroup({})

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData

    this.fetchCohort()
    this.fetchResearcher()
    this.getGeneralInfoListData()
  }

  fetchCohort(): void {
    if (this.study.cohortId === null || this.study.cohortId === undefined) {
      this.isCohortsFetched = true
    } else {
      this.cohortService.get(this.study.cohortId).subscribe((cohortApi) => {
        this.study.addCohortGroup(cohortApi?.cohortGroup)
        this.isCohortsFetched = true
      })
    }
  }

  fetchResearcher(): void {
    const userIds = this.study.researchersApi.map((researcher) => researcher.userId)
    if (!userIds.length) {
      this.isResearchersFetched = true
    } else {
      // !! As a researcher it is not allowed to request users by id !!
      // TO DO: Replace with new study endpoint once implemented in the backend
      this.adminService.getUsersByIds(userIds).subscribe((researchers) => {
        this.study.researchers = researchers
        this.isResearchersFetched = true
      })
    }
  }

  getGeneralInfoListData(): void {
    this.generalInfoData = [
      { title: 'FORM.TITLE', description: this.study?.name },
      { title: 'FORM.DESCRIPTION', description: this.study?.description },
      { title: 'FORM.FIRST_HYPOTHESES', description: this.study?.firstHypotheses },
      { title: 'FORM.SECOND_HYPOTHESES', description: this.study?.secondHypotheses },
    ]
  }

  cancel(): void {
    this.router.navigate(['data-explorer/studies'])
  }
}
