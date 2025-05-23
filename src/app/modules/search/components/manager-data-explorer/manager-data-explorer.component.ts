import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { downloadFile } from 'src/app/core/utils/download-file.utils'
import { AqbUiModel } from 'src/app/shared/models/aqb/aqb-ui.model'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { EXPORT_ERROR, RESULT_SET_LOADING_ERROR } from './constants'
import { FlexModule } from '@angular/flex-layout/flex'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { ResultTableComponent } from '../../../../shared/components/result-table/result-table.component'
import { MatCard } from '@angular/material/card'
import { MatDivider } from '@angular/material/list'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-manager-data-explorer',
  templateUrl: './manager-data-explorer.component.html',
  styleUrls: ['./manager-data-explorer.component.scss'],
  imports: [
    FlexModule,
    ButtonComponent,
    MatProgressSpinner,
    ResultTableComponent,
    MatCard,
    MatDivider,
    TranslatePipe,
  ],
})
export class ManagerDataExplorerComponent implements OnDestroy, OnInit {
  private subscriptions = new Subscription()

  aqbModel = new AqbUiModel()
  currentProject: ProjectUiModel
  isDataSetLoading = false
  isExportLoading = false
  resultSet: IAqlExecutionResponse[]

  constructor(
    private patientFilterService: PatientFilterService,
    private route: ActivatedRoute,
    private router: Router,
    private toastMessageService: ToastMessageService
  ) {}

  ngOnInit(): void {
    this.currentProject = this.route.snapshot.data.resolvedData
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  goBack(): void {
    this.patientFilterService.setCurrentProject(this.currentProject)
    this.router.navigate(['search', 'data-filter'])
  }

  getData(): void {
    this.isDataSetLoading = true
    this.subscriptions.add(
      this.patientFilterService
        .getProjectData(
          {
            id: null,
            cohortGroup: this.currentProject.convertToApiInterface().cohortGroup,
            name: 'Preview Cohort',
            projectId: null,
            description: '',
          },
          this.currentProject.templates.map((template) => template.templateId)
        )
        .subscribe({
          next: (result) => {
            this.resultSet = result
            this.isDataSetLoading = false
          },
          error: () => {
            this.isDataSetLoading = false
            this.toastMessageService.openToast(RESULT_SET_LOADING_ERROR)
          },
        })
    )
  }

  exportFile(format: 'csv' | 'json'): void {
    this.isExportLoading = true
    this.subscriptions.add(
      this.patientFilterService
        .exportFile(
          {
            id: null,
            cohortGroup: this.currentProject.convertToApiInterface().cohortGroup,
            name: 'Preview Cohort',
            projectId: null,
            description: '',
          },
          this.currentProject.templates.map((template) => template.templateId),
          format
        )
        .subscribe({
          next: (response) => {
            downloadFile('manager_preview', format, response)
            this.isExportLoading = false
          },
          error: (_) => {
            this.isExportLoading = false
            this.toastMessageService.openToast({
              ...EXPORT_ERROR,
              messageParameters: {
                format: format.toUpperCase(),
              },
            })
          },
        })
    )
  }
}
