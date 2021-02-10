import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { IStudyResolved } from 'src/app/modules/studies/models/study-resolved.interface'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { DataExplorerConfigurations } from 'src/app/shared/models/data-explorer-configurations.enum'
import { DataRequestStatus } from 'src/app/shared/models/data-request-status.enum'
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

  resultSet: IAqlExecutionResponse
  dataRequestStatus: DataRequestStatus = DataRequestStatus.NotRequested
  configuration: DataExplorerConfigurations = DataExplorerConfigurations.Default

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private adminService: AdminService,
    private aqlService: AqlService
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

  getDataSet(): void {
    this.dataRequestStatus = DataRequestStatus.Loading

    this.aqlService.getResultSet().subscribe(
      (resultSet) => {
        this.resultSet = resultSet
      },
      (err) => {},
      () => {
        this.dataRequestStatus = DataRequestStatus.Requested
      }
    )
  }
}
