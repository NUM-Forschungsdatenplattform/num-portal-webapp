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

import { DateHelperService } from 'src/app/core/helper/date-helper.service'
import { ProjectCategory } from 'src/app/modules/projects/models/project-category.enum'
import { IDefinitionList } from '../definition-list.interface'
import { DefinitionType } from '../definition-type.enum'
import { LogicalOperator } from '../logical-operator.enum'
import { IProjectUser } from '../user/project-user.interface'
import { IUser } from '../user/user.interface'
import { ICohortGroupApi } from './cohort-group-api.interface'
import { CohortGroupUiModel } from './cohort-group-ui.model'
import { IProjectApi } from './project-api.interface'
import { ProjectStatus } from './project-status.enum'
import { IProjectTemplateInfoApi } from './project-template-info-api.interface'
import moment from 'moment'
import { ProjectAttachmentUiModel } from './project-attachment-ui.model'

export class ProjectUiModel {
  cohortId: number | null
  cohortGroup: CohortGroupUiModel
  /** The coordinator of the project. Is automatically asigned based on the auth-token */
  coordinator?: IUser
  description?: string
  simpleDescription?: string
  goal?: string
  firstHypotheses?: string
  secondHypotheses?: string
  keywords?: string[]
  categories?: ProjectCategory[]
  startDate?: Date
  endDate?: Date
  financed?: boolean
  usedOutsideEu?: boolean
  id: number | null
  modifiedDate?: Date
  name?: string
  researchers: IUser[]
  researchersApi: IProjectUser[]
  status: ProjectStatus
  templates: IProjectTemplateInfoApi[]
  attachments: ProjectAttachmentUiModel[] = []

  constructor(projectApi?: IProjectApi) {
    this.id = projectApi?.id || null
    this.description = projectApi?.description || undefined
    this.simpleDescription = projectApi?.simpleDescription || undefined
    this.goal = projectApi?.goal || undefined
    this.firstHypotheses = projectApi?.firstHypotheses || undefined
    this.secondHypotheses = projectApi?.secondHypotheses || undefined
    this.keywords = projectApi?.keywords || []
    this.categories = projectApi?.categories || []
    this.startDate = projectApi?.startDate ? new Date(projectApi.startDate) : new Date()
    this.endDate = projectApi?.endDate
      ? new Date(projectApi.endDate)
      : new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    this.financed = projectApi?.financed || false
    this.usedOutsideEu = projectApi?.usedOutsideEu || false

    this.coordinator = projectApi?.coordinator || undefined
    this.modifiedDate = projectApi?.modifiedDate ? new Date(projectApi?.modifiedDate) : undefined
    this.name = projectApi?.name || undefined
    this.status = projectApi?.status || ProjectStatus.Draft
    this.cohortId = projectApi?.cohortId || null
    this.researchers = []
    this.researchersApi = projectApi?.researchers || []
    this.templates = projectApi?.templates || []
    this.cohortGroup = new CohortGroupUiModel()
    this.attachments =
      projectApi?.attachments?.map((attachment) => new ProjectAttachmentUiModel(attachment)) || []
  }

  addCohortGroup(cohortGroup?: ICohortGroupApi): void {
    this.cohortGroup = new CohortGroupUiModel()
    if (!cohortGroup) {
      return
    }
    if (cohortGroup.operator === LogicalOperator.Not) {
      const isNegated = true
      const firstChild = cohortGroup.children[0]
      this.cohortGroup.convertToUi(firstChild, isNegated)
    } else {
      this.cohortGroup.convertToUi(cohortGroup, false)
    }
  }

  public convertToApiInterface(
    id?: number,
    formValues?: ProjectUiModel
  ): { project: IProjectApi; cohortGroup: ICohortGroupApi } {
    const projectApi: IProjectApi = {
      id: id || this.id,
      name: formValues?.name || this.name,
      description: formValues?.description || this.description,
      simpleDescription: formValues?.simpleDescription || this.simpleDescription,
      goal: formValues?.goal || this.goal,
      firstHypotheses: formValues?.firstHypotheses || this.firstHypotheses,
      secondHypotheses: formValues?.secondHypotheses || this.secondHypotheses,
      keywords: formValues?.keywords || this.keywords,
      categories: formValues?.categories || this.categories,
      startDate: DateHelperService.getDateString(
        moment(formValues?.startDate) || moment(this.startDate)
      ),
      endDate: DateHelperService.getDateString(moment(formValues?.endDate) || moment(this.endDate)),
      financed: formValues?.financed,
      usedOutsideEu: formValues?.usedOutsideEu,
      cohortId: formValues?.cohortId || this.cohortId,
      researchers: this.getResearchersForApi(),
      status: this.status,
      templates: this.templates,
    }

    const cohortGroup = this.cohortGroup.convertToApi()

    return { project: projectApi, cohortGroup }
  }

  public getProjectPreviewGeneralInfo(): IDefinitionList[] {
    return [
      { title: 'PROJECT.TITLE', description: this.name },
      { title: 'FORM.DESCRIPTION', description: this.description },
      { title: 'FORM.SIMPLE_DESCRIPTION', description: this.simpleDescription },
      { title: 'PROJECT.GOAL', description: this.goal },
      { title: 'PROJECT.FIRST_HYPOTHESES', description: this.firstHypotheses },
      { title: 'PROJECT.SECOND_HYPOTHESES', description: this.secondHypotheses },
      { title: 'FORM.KEYWORDS', description: this.keywords, type: DefinitionType.Array },
      { title: 'FORM.CATEGORY', description: this.categories, type: DefinitionType.Array },
      {
        title: 'FORM.START_DATE',
        description: this.startDate || undefined,
        type: DefinitionType.Date,
      },
      {
        title: 'FORM.END_DATE',
        description: this.endDate || undefined,
        type: DefinitionType.Date,
      },
      {
        title: 'FORM.ATTACHMENTS',
        description: this.attachments || [],
        type: DefinitionType.Table,
      },
      {
        title: 'FORM.FINANCED_BY_PRIVATE',
        description: this.financed,
        type: DefinitionType.Boolean,
      },
      {
        title: 'FORM.USED_OUTSIDE_EU',
        description: this.usedOutsideEu,
        type: DefinitionType.Boolean,
      },
    ]
  }

  public updateAttachments(attachments: ProjectAttachmentUiModel[]): void {
    this.attachments = attachments
  }

  private getResearchersForApi(): IProjectUser[] {
    return this.researchers.map((researcher) => {
      return {
        userId: researcher.id,
        organizationId: researcher.organization?.id,
        approved: researcher.approved,
      }
    })
  }
}
