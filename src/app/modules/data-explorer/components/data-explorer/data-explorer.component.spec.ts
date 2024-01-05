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

import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { RouterTestingModule } from '@angular/router/testing'
import { DataExplorerComponent } from './data-explorer.component'
import { IProjectResolved } from 'src/app/modules/projects/models/project-resolved.interface'
import { mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { DataExplorerConfigurations } from 'src/app/shared/models/data-explorer-configurations.enum'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { mockSimpleContainment } from 'src/mocks/data-mocks/aqb/simple-containment.mock'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import {
  BUILDER_DIALOG_CONFIG,
  COMPOSITION_LOADING_ERROR,
  EXPORT_ERROR,
  RESULT_SET_LOADING_ERROR,
} from './constants'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { AqbUiModel } from 'src/app/shared/models/aqb/aqb-ui.model'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProfileService } from 'src/app/core/services/profile/profile.service'

describe('DataExplorerComponent', () => {
  let component: DataExplorerComponent
  let fixture: ComponentFixture<DataExplorerComponent>
  let router: Router

  const buildResponse: IArchetypeQueryBuilderResponse = {
    q: 'result string',
    parameters: {},
  }

  const profileService = {
    get: jest.fn(),
  } as unknown as ProfileService

  const cohortService = {
    create: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
  } as unknown as CohortService

  const adminService = {
    getUsersByIds: jest.fn(),
  } as unknown as AdminService

  const projectService = {
    executeAdHocAql: jest.fn(),
    exportFile: jest.fn(),
  } as unknown as ProjectService

  const afterClosedSubject$ = new Subject<IAqlBuilderDialogOutput>()

  const dialogService = {
    openDialog: jest.fn().mockImplementation(() => ({
      afterClosed: () => afterClosedSubject$.asObservable(),
    })),
  } as unknown as DialogService

  const aqlEditorService = {
    getContainment: jest.fn(),
    buildAql: jest.fn(),
  } as unknown as AqlEditorService

  const toastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const resolvedData: IProjectResolved = {
    project: new ProjectUiModel(mockProject1),
    error: null,
  }

  const route = {
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown as ActivatedRoute

  @Component({ selector: 'num-project-editor-accordion', template: '' })
  class StubProjectEditorAccordionComponent {
    @Input() isResearchersFetched: boolean
    @Input() isCohortsFetched: boolean

    @Input() isTemplatesDisabled: boolean
    @Input() isResearchersDisabled: boolean
    @Input() isGeneralInfoDisabled: boolean
    @Input() isCohortBuilderDisabled: boolean

    @Input() project: ProjectUiModel
    @Input() projectForm: FormGroup
    @Input() cohortGroup: CohortGroupUiModel
    @Input() generalInfoData: IDefinitionList[]
  }

  @Component({ selector: 'num-result-table', template: '' })
  class ResultTableStubComponent {
    @Input() resultSet: IAqlExecutionResponse
    @Input() isDataSetLoading: boolean
    @Input() index: number
    @Input() totalTables: number
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataExplorerComponent,
        StubProjectEditorAccordionComponent,
        ButtonComponent,
        ResultTableStubComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: CohortService,
          useValue: cohortService,
        },
        {
          provide: AdminService,
          useValue: adminService,
        },
        {
          provide: ProjectService,
          useValue: projectService,
        },
        {
          provide: DialogService,
          useValue: dialogService,
        },
        {
          provide: AqlEditorService,
          useValue: aqlEditorService,
        },
        {
          provide: ToastMessageService,
          useValue: toastMessageService,
        },
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    jest.restoreAllMocks()
    jest.clearAllMocks()
    jest.spyOn(router, 'navigate').mockImplementation()
    jest.spyOn(cohortService, 'get').mockImplementation(() => of(mockCohort1))
    jest.spyOn(cohortService, 'update').mockImplementation(() => of(mockCohort1))
    jest.spyOn(adminService, 'getUsersByIds').mockImplementation(() => of(mockUsers))
    jest.spyOn(profileService, 'get').mockImplementation(() =>
      of({
        id: '123-abc',
        username: 'string',
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        createdTimestamp: 1,
        approved: true,
        organization: null,
      })
    )
  })

  describe('When the components gets initialized and the cohortId is not specified', () => {
    test.each([null, undefined])('should flag the cohorts as fetched', (cohortId) => {
      const cohortIdBackup = resolvedData.project.cohortId
      resolvedData.project.cohortId = cohortId
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(component.isCohortsFetched).toBeTruthy()
      resolvedData.project.cohortId = cohortIdBackup
    })
  })

  describe('When the components gets initialized and the researchers are not specified', () => {
    it('should flag the researchers as fetched', () => {
      resolvedData.project.researchersApi = []
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(component.isResearchersFetched).toBeTruthy()
    })
  })

  describe('When the components gets initialized and the cohortId is specified', () => {
    it('should call the cohortService to get the cohort and flag the cohort as fetched', (done) => {
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
      component.resolvedData.project = new ProjectUiModel(mockProject1)
      expect(cohortService.get).toHaveBeenLastCalledWith(mockProject1.cohortId)

      fixture.whenStable().then(() => {
        expect(component.isCohortsFetched).toBeTruthy()
        done()
      })
    })
  })

  describe('When the components gets initialized and the researchers are specified', () => {
    it('should call the adminService to get the researchers and flag the researchers as fetched', (done) => {
      const users = [{ userId: 'abc-1' }, { userId: 'abc-2' }]
      resolvedData.project.researchersApi = users
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      expect(adminService.getUsersByIds).toHaveBeenLastCalledWith([
        ...users.map((user) => user.userId),
      ])

      fixture.whenStable().then(() => {
        expect(component.isResearchersFetched).toBeTruthy()
        done()
      })
    })
  })

  describe('When the component gets initialized and the templates are specified', () => {
    beforeEach(() => {
      jest
        .spyOn(aqlEditorService, 'getContainment')
        .mockImplementation(() => of(mockSimpleContainment))

      jest.spyOn(aqlEditorService, 'buildAql').mockImplementation(() => of(buildResponse))

      resolvedData.project.templates = [
        {
          templateId: 'mockSimpleContainment',
          name: 'test',
        },
      ]
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should set the selected and allowed templates to the component', () => {
      const templateIds = resolvedData.project.templates.map(
        (resolvedTemplate) => resolvedTemplate.templateId
      )
      expect(component.selectedTemplateIds).toEqual(templateIds)
      expect(component.allowedTemplateIds).toEqual(templateIds)
    })

    it('should call the api to compile the query and set the compiled query result to the component', () => {
      expect(aqlEditorService.buildAql).toHaveBeenCalledTimes(1)
      expect(component.compiledQuery).toEqual(buildResponse)
    })

    it('should fetch the containments of the templates and flag the compositions as fetched', () => {
      expect(aqlEditorService.getContainment).toHaveBeenCalledWith(
        resolvedData.project.templates[0].templateId
      )
      expect(component.isCompositionsFetched).toEqual(true)
    })

    it('should prefill the select clause of the aqb model', () => {
      expect(component.aqbModel.select.length).toEqual(1)
    })

    it('should store the default aqb model for the purpose of reset', () => {
      expect(component.aqbModel).toEqual(component.initialAqbModel)
    })
  })

  describe('When the component gets initialized and the templates are specified but can not be compiled or fetched', () => {
    beforeEach(() => {
      jest.spyOn(aqlEditorService, 'getContainment').mockImplementation(() => throwError('error'))
      jest.spyOn(aqlEditorService, 'buildAql').mockImplementation(() => of(buildResponse))
      jest.spyOn(toastMessageService, 'openToast').mockImplementation()

      resolvedData.project.templates = [
        {
          templateId: 'mockSimpleContainment',
          name: 'test',
        },
      ]
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should show an error message to the user and flag the compositions as fetched', () => {
      expect(toastMessageService.openToast).toHaveBeenCalledWith(COMPOSITION_LOADING_ERROR)
      expect(component.isCompositionsFetched).toEqual(true)
    })
  })

  describe('When the cancel button is clicked', () => {
    let backButton
    beforeEach(() => {
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
      const nativeElement = fixture.debugElement.nativeElement
      backButton = nativeElement.querySelector('#back-button')
    })

    it('should have the back button named correct', () => {
      expect(backButton.textContent).toEqual('BUTTON.BACK')
    })

    it('should navigate back to the dashboard projects overview', () => {
      resolvedData.project.id = 1
      backButton.querySelector('button').click()
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/projects'])
    })
  })

  describe('When the configuration of the cohort-aql is supposed to be edited', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      component.openBuilderDialog()
    })

    it('should open the dialog with the config including the content payload', () => {
      const dialogContentPayload: IAqlBuilderDialogInput = {
        mode: AqlBuilderDialogMode.DataRetrieval,
        model: component.aqbModel,
        selectedTemplateIds: component.selectedTemplateIds,
        allowedTemplates: component.allowedTemplateIds,
      }

      const dialogConfig: DialogConfig = {
        ...BUILDER_DIALOG_CONFIG,
        dialogContentPayload,
      }
      expect(dialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })

    describe('When the builder dialog is confirm-closed', () => {
      const dialogOutput: IAqlBuilderDialogOutput = {
        model: new AqbUiModel(),
        result: {
          parameters: { test: 'test' },
          q: 'test query',
        },
        selectedTemplateIds: ['temp1', 'temp2'],
      }

      beforeEach(() => {
        afterClosedSubject$.next(dialogOutput)
      })

      it('should set the dialog result to the component', () => {
        expect(component.compiledQuery).toEqual(dialogOutput.result)
        expect(component.selectedTemplateIds).toEqual(dialogOutput.selectedTemplateIds)
        expect(component.aqbModel).toEqual(dialogOutput.model)
      })
    })

    it('should do nothing, when its not a confirm-close', () => {
      jest.spyOn(component, 'handleDialogConfirm')
      component.openBuilderDialog()
      afterClosedSubject$.next()
      expect(component.handleDialogConfirm).not.toHaveBeenCalled()
    })
  })

  describe('When the resultSet is fetched', () => {
    const mockResultSet: IAqlExecutionResponse = {
      q: 'some query',
      name: 'Table name',
      columns: [
        {
          name: 'col1',
          path: 'path to col1',
        },
        {
          name: 'col2',
          path: 'path to col2',
        },
      ],
      rows: [
        ['col1 result 1', 'col2 result 1'],
        ['col1 result 2', 'col2 result 2'],
      ],
    }

    beforeEach(() => {
      jest.spyOn(projectService, 'executeAdHocAql').mockImplementation(() => of([mockResultSet]))
      component.compiledQuery = buildResponse
    })

    it('should set the response as the resultSet and flag loading as complete', () => {
      component.getDataSet()

      expect(component.isDataSetLoading).toEqual(false)
      expect(component.resultSet).toEqual([mockResultSet])
    })
  })

  describe('When the resultSet cannot be fetched', () => {
    beforeEach(() => {
      jest.spyOn(projectService, 'executeAdHocAql').mockImplementation(() => throwError('error'))
      jest.spyOn(toastMessageService, 'openToast').mockImplementation()
      component.compiledQuery = buildResponse
    })

    it('should show an error message to the user, set the resultSet as undefined and flag loading as complete', () => {
      component.getDataSet()

      expect(toastMessageService.openToast).toHaveBeenCalledWith(RESULT_SET_LOADING_ERROR)
      expect(component.isDataSetLoading).toEqual(false)
      expect(component.resultSet).toBeUndefined()
    })
  })

  describe('When the Export CSV Button is clicked', () => {
    beforeEach(() => {
      jest.spyOn(projectService, 'exportFile').mockImplementation(() => of('some text'))
      component.compiledQuery = buildResponse
    })

    it('should call the projectService.exportFile', () => {
      const mockCreateUrl = jest.fn().mockReturnValue('url')
      Object.defineProperty(URL, 'createObjectURL', {
        value: () => mockCreateUrl,
      })

      component.exportFile('csv')

      expect(projectService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)
    })

    it('should trigger the download', () => {
      const filename = `csv_export_${component.project.id}.zip`
      const mockHtmlElement = document.createElement('a')

      mockHtmlElement.setAttribute = jest.fn()
      mockHtmlElement.click = jest.fn()
      mockHtmlElement.remove = jest.fn()

      const mockCreateUrl = jest.fn().mockReturnValue('url')

      Object.defineProperty(document, 'createElement', {
        value: () => mockHtmlElement,
      })

      Object.defineProperty(URL, 'createObjectURL', {
        value: () => mockCreateUrl,
      })

      component.exportFile('csv')

      expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith('download', filename)
      expect(mockHtmlElement.click).toHaveBeenCalledTimes(1)
      expect(mockHtmlElement.remove).toHaveBeenCalledTimes(1)
    })

    it('should show toast in case of error', () => {
      jest.spyOn(projectService, 'exportFile').mockImplementation(() => throwError('error'))
      jest.spyOn(toastMessageService, 'openToast').mockImplementation()

      component.exportFile('csv')
      expect(projectService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)

      const messageConfig: IToastMessageConfig = {
        ...EXPORT_ERROR,
        messageParameters: {
          format: 'CSV',
        },
      }

      expect(toastMessageService.openToast).toHaveBeenCalledWith(messageConfig)
    })
  })

  describe('When the Export JSON Button is clicked', () => {
    beforeEach(() => {
      jest.spyOn(projectService, 'exportFile').mockImplementation(() => of('some text'))
      component.compiledQuery = buildResponse
    })

    it('should call the ProjectService.exportFile', () => {
      component.exportFile('json')

      expect(projectService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)
    })

    it('should trigger the download', () => {
      const filename = `json_export_${component.project.id}.json`
      const mockHtmlElement = document.createElement('a')

      mockHtmlElement.setAttribute = jest.fn()
      mockHtmlElement.click = jest.fn()
      mockHtmlElement.remove = jest.fn()

      Object.defineProperty(document, 'createElement', {
        value: () => mockHtmlElement,
      })

      component.exportFile('json')

      expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith('download', filename)
      expect(mockHtmlElement.click).toHaveBeenCalledTimes(1)
      expect(mockHtmlElement.remove).toHaveBeenCalledTimes(1)
    })

    it('should show toast in case of error', () => {
      jest.spyOn(projectService, 'exportFile').mockImplementation(() => throwError('error'))
      jest.spyOn(toastMessageService, 'openToast').mockImplementation()

      component.exportFile('json')
      expect(projectService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)

      const messageConfig: IToastMessageConfig = {
        ...EXPORT_ERROR,
        messageParameters: {
          format: 'JSON',
        },
      }

      expect(toastMessageService.openToast).toHaveBeenCalledWith(messageConfig)
    })
  })

  describe('On the attempt to reset the custom configuration', () => {
    beforeEach(() => {
      component.aqbModel = new AqbUiModel()
      component.configuration = DataExplorerConfigurations.Custom
      component.resetAqbModel()
    })

    it('should set the aqbModel to the default', () => {
      expect(component.aqbModel).toEqual(component.initialAqbModel)
    })

    it('should let the aql-editor-service compile the query', () => {
      expect(aqlEditorService.buildAql).toHaveBeenCalledTimes(1)
    })

    it('should fetch the DataSet', () => {
      expect(projectService.executeAdHocAql).toHaveBeenCalledTimes(1)
    })

    it('should reset the configuration flag to default', () => {
      expect(component.configuration).toEqual(DataExplorerConfigurations.Default)
    })
  })
})
