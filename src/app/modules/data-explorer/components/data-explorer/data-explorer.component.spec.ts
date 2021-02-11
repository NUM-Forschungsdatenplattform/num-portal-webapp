import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, Router } from '@angular/router'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { CohortService } from 'src/app/core/services/cohort/cohort.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { StudyUiModel } from 'src/app/shared/models/study/study-ui.model'
import { mockStudy1 } from 'src/mocks/data-mocks/studies.mock'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { RouterTestingModule } from '@angular/router/testing'
import { DataExplorerComponent } from './data-explorer.component'
import { IStudyResolved } from 'src/app/modules/studies/models/study-resolved.interface'
import { PhenotypeService } from 'src/app/core/services/phenotype/phenotype.service'
import { mockUsers } from 'src/mocks/data-mocks/admin.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { resultSetMock } from 'src/mocks/data-mocks/result-set-mock'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { DataExplorerConfigurations } from 'src/app/shared/models/data-explorer-configurations.enum'
import { DataRequestStatus } from 'src/app/shared/models/data-request-status.enum'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { mockSimpleContainment } from 'src/mocks/data-mocks/aqb/simple-containment.mock'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { BUILDER_DIALOG_CONFIG, COMPOSITION_LOADING_ERROR } from './constants'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { AqbUiModel } from 'src/app/modules/aqls/models/aqb/aqb-ui.model'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'

describe('DataExplorerComponent', () => {
  let component: DataExplorerComponent
  let fixture: ComponentFixture<DataExplorerComponent>
  let router: Router

  const buildResponse: IArchetypeQueryBuilderResponse = {
    q: 'result string',
    parameters: {},
  }

  const cohortService = ({
    create: jest.fn(),
    update: jest.fn(),
    get: jest.fn(),
  } as unknown) as CohortService

  const phenotypeService = ({
    get: jest.fn().mockImplementation(() => of()),
  } as unknown) as PhenotypeService

  const adminService = ({
    getUsersByIds: jest.fn(),
  } as unknown) as AdminService

  const aqlService = ({
    getResultSet: () => of(resultSetMock),
  } as unknown) as AqlService

  const afterClosedSubject$ = new Subject<IAqlBuilderDialogOutput>()

  const dialogService = ({
    openDialog: jest.fn().mockImplementation(() => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  const aqlEditorService = ({
    getContainment: jest.fn(),
    buildAql: jest.fn(),
  } as unknown) as AqlEditorService

  const toastMessageService = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  const resolvedData: IStudyResolved = {
    study: new StudyUiModel(mockStudy1, phenotypeService),
    error: null,
  }

  const route = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

  @Component({ selector: 'num-study-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
    @Input() isDisabled: boolean
    @Input() generalInfoData: IDefinitionList[]
  }
  @Component({ selector: 'num-study-editor-connector', template: '' })
  class StubStudyEditorConnector {
    @Input() cohortNode: any
    @Input() isLoadingComplete: boolean
    @Input() isDisabled: boolean
  }
  @Component({ selector: 'num-study-editor-researchers', template: '' })
  class StudyEditorResearchers {
    @Input() researchers: any[]
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
  }

  @Component({ selector: 'num-study-editor-templates', template: '' })
  class StudyEditorTemplatesStubComponent {
    @Input() templates: any
    @Input() isDisabled: boolean
  }

  @Component({ selector: 'num-result-table', template: '' })
  class ResultTableStubComponent {
    @Input() resultSet: IAqlExecutionResponse
    @Input() dataRequestStatus: DataRequestStatus
    @Input() configuration: DataExplorerConfigurations
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataExplorerComponent,
        StubGeneralInfoComponent,
        StubStudyEditorConnector,
        StudyEditorResearchers,
        ButtonComponent,
        StudyEditorTemplatesStubComponent,
        ResultTableStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
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
          provide: AqlService,
          useValue: aqlService,
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
  })

  describe('When the components gets initialized and the cohortId is not specified', () => {
    test.each([null, undefined])('should flag the cohorts as fetched', (cohortId) => {
      const cohortIdBackup = resolvedData.study.cohortId
      resolvedData.study.cohortId = cohortId
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(component.isCohortsFetched).toBeTruthy()
      resolvedData.study.cohortId = cohortIdBackup
    })
  })

  describe('When the components gets initialized and the researchers are not specified', () => {
    it('should flag the researchers as fetched', () => {
      resolvedData.study.researchersApi = []
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(component.isResearchersFetched).toBeTruthy()
    })
  })

  describe('When the components gets initialized and the cohortId is specified', () => {
    it('should call the cohortService to get the cohort and flag the cohort as fetched', async (done) => {
      fixture = TestBed.createComponent(DataExplorerComponent)
      component = fixture.componentInstance

      fixture.detectChanges()
      component.resolvedData.study = new StudyUiModel(mockStudy1, phenotypeService)
      expect(cohortService.get).toHaveBeenLastCalledWith(mockStudy1.cohortId)

      fixture.whenStable().then(() => {
        expect(component.isCohortsFetched).toBeTruthy()
        done()
      })
    })
  })

  describe('When the components gets initialized and the researchers are specified', () => {
    it('should call the adminService to get the researchers and flag the researchers as fetched', async (done) => {
      const users = [{ userId: 'abc-1' }, { userId: 'abc-2' }]
      resolvedData.study.researchersApi = users
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

      resolvedData.study.templates = [
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
      const templateIds = resolvedData.study.templates.map(
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
        resolvedData.study.templates[0].templateId
      )
      expect(component.isCompositionsFetched).toEqual(true)
    })

    it('should prefill the select clause of the aqb model', () => {
      expect(component.aqbModel.select.length).toEqual(1)
    })
  })

  describe('When the component gets initialized and the templates are specified but can not be compiled or fetched', () => {
    beforeEach(() => {
      jest.spyOn(aqlEditorService, 'getContainment').mockImplementation(() => throwError('error'))
      jest.spyOn(aqlEditorService, 'buildAql').mockImplementation(() => of(buildResponse))
      jest.spyOn(toastMessageService, 'openToast').mockImplementation()

      resolvedData.study.templates = [
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

    it('should navigate back to the dashboard studies overview', () => {
      resolvedData.study.id = 1
      backButton.querySelector('button').click()
      expect(router.navigate).toHaveBeenCalledWith(['data-explorer/studies'])
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
        mode: AqlBuilderDialogMode.DataExplorer,
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
})
