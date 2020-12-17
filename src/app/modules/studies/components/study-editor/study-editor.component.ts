import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { CohortService } from 'src/app/core/services/cohort.service'
import { StudyService } from 'src/app/core/services/study.service'
import { ICohortApi } from 'src/app/shared/models/study/cohort-api.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/study/cohort-group-ui.model'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { IStudyResolved } from '../../study-resolved.interface'
import { IStudyTemplateInfoApi } from '../../../../shared/models/study/study-template-info-api.interface'

@Component({
  selector: 'num-study-editor',
  templateUrl: './study-editor.component.html',
  styleUrls: ['./study-editor.component.scss'],
})
export class StudyEditorComponent implements OnInit {
  resolvedData: IStudyResolved
  get study(): StudyUiModel {
    return this.resolvedData.study
  }

  get cohortGroup(): CohortGroupUiModel {
    return this.study.cohortGroup
  }

  get studyTemplate(): IStudyTemplateInfoApi[] {
    return this.study.templates
  }

  studyForm: FormGroup
  get formTitle(): FormControl {
    return this.studyForm.get('title') as FormControl
  }

  constructor(
    private route: ActivatedRoute,
    private studyService: StudyService,
    private cohortService: CohortService
  ) {}

  ngOnInit(): void {
    this.resolvedData = this.route.snapshot.data.resolvedData
    this.generateForm()
  }

  generateForm(): void {
    this.studyForm = new FormGroup({
      title: new FormControl(this.study?.name, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.study?.description, [
        Validators.required,
        Validators.minLength(3),
      ]),
      firstHypotheses: new FormControl(this.study?.firstHypotheses, [
        Validators.required,
        Validators.minLength(3),
      ]),
      secondHypotheses: new FormControl(this.study?.secondHypotheses),
    })
  }

  getStudyForApi(): { study: IStudyApi; cohort: ICohortApi } {
    const id = this.study.id === 0 ? null : this.study.id
    const formValues = this.studyForm.value
    const { study, cohortGroup } = this.study.convertToApiInterface(
      id,
      formValues.title,
      formValues.description,
      formValues.firstHypotheses,
      formValues.secondHypotheses
    )
    const cohort: ICohortApi = {
      cohortGroup,
      id: study.cohortId || null,
      name: study.name,
      studyId: study.id,
      description: study.description,
    }

    return { study, cohort }
  }

  saveCohort(cohort: ICohortApi): Promise<ICohortApi> {
    return this.cohortService.save(cohort).toPromise()
  }

  saveStudy(study: IStudyApi): Promise<IStudyApi> {
    return this.studyService.create(study).toPromise()
  }

  async save(): Promise<void> {
    const { study, cohort } = this.getStudyForApi()
    try {
      const studyResult = await this.saveStudy(study)
      this.study.id = studyResult.id
      if (cohort.cohortGroup) {
        cohort.studyId = studyResult.id
        await this.saveCohort(cohort)
      }
      // TODO: Display message to user
    } catch (error) {
      console.log(error)
      // TODO: Display message to user
    }
  }

  sendForApproval(): void {
    this.study.status = StudyStatus.Pending
    this.save()
  }
}
