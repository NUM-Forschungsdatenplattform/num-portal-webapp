import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { mockResultFlatList } from 'src/mocks/data-mocks/result-set-mock'
import { EXPORT_ERROR } from './constants'

import { ManagerDataExplorerComponent } from './manager-data-explorer.component'

jest.mock('src/app/core/utils/download-file.utils', () => ({
  __esModule: true,
  downloadFile: jest.fn().mockImplementation(() => ''),
}))
import { downloadFile } from 'src/app/core/utils/download-file.utils'

describe('ManagerDataRetrievComponent', () => {
  let component: ManagerDataExplorerComponent
  let fixture: ComponentFixture<ManagerDataExplorerComponent>

  @Component({
    selector: 'num-result-table',
    template: '<div></div>',
  })
  class ResultTableComponentStub {
    @Input() resultSet: IAqlExecutionResponse
    @Input() isDataSetLoading: boolean
    @Input() index: number
    @Input() totalTables: number
  }

  const mockResultSetSubject$ = new Subject()
  const mockPatientFilterService = {
    projectDataObservable$: mockResultSetSubject$.asObservable(),
    getProjectData: jest.fn(),
    exportFile: jest.fn(),
    setCurrentProject: jest.fn(),
  } as unknown as PatientFilterService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const mockRouter = {
    navigate: jest.fn(),
  } as unknown as Router

  const resolvedData: ProjectUiModel = new ProjectUiModel(mockProject1)
  resolvedData.addCohortGroup(mockCohort1.cohortGroup)
  resolvedData.templates = [
    { templateId: 'test1', name: 'testName1' },
    { templateId: 'test2', name: 'testName2' },
    { templateId: 'test3', name: 'testName3' },
  ]
  const mockActivatedRoute = {
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown as ActivatedRoute

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerDataExplorerComponent, ResultTableComponentStub, ButtonComponent],
      imports: [
        MaterialModule,
        FontAwesomeTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: PatientFilterService,
          useValue: mockPatientFilterService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
    fixture = TestBed.createComponent(ManagerDataExplorerComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the user navigates back', () => {
    beforeEach(() => {
      fixture.detectChanges()
      component.goBack()
    })

    it('should store the current project inside filter service', () => {
      expect(mockPatientFilterService.setCurrentProject).toHaveBeenCalledWith(resolvedData)
    })

    it('should navigate the user to the data filter page', () => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['search', 'data-filter'])
    })
  })

  describe('When the user clicks the button to fetch the data', () => {
    beforeEach(() => {
      fixture.detectChanges()
      jest
        .spyOn(mockPatientFilterService, 'getProjectData')
        .mockImplementation(() => of(mockResultFlatList))
    })

    it('should call the service to get the project data', async () => {
      component.getData()
      expect(mockPatientFilterService.getProjectData).toHaveBeenCalled()
    })
  })

  describe('When there is an error during data retrieval', () => {
    beforeEach(() => {
      fixture.detectChanges()
      jest
        .spyOn(mockPatientFilterService, 'getProjectData')
        .mockImplementation(() => throwError('Error fetching data'))

      component.getData()
    })

    it('should show a message to the user', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith({
        message: 'DATA_EXPLORER.RESULT_SET_ERROR',
        type: ToastMessageType.Error,
      })
    })

    it('should reset the loading status', () => {
      expect(component.isDataSetLoading).toBe(false)
    })
  })

  describe('When the Export CSV Button is clicked', () => {
    beforeEach(() => {
      jest
        .spyOn(mockPatientFilterService, 'getProjectData')
        .mockImplementation(() => of(mockResultFlatList))
      fixture.detectChanges()
      jest
        .spyOn(mockPatientFilterService, 'exportFile')
        .mockImplementation(() => of('File CSV export result'))
    })

    it('should call the patientFilterService.exportFile', () => {
      const mockCreateUrl = jest.fn().mockReturnValue('url')
      Object.defineProperty(URL, 'createObjectURL', {
        value: () => mockCreateUrl,
        configurable: true,
        writable: true,
      })
      component.exportFile('csv')
      console.log(mockCreateUrl)
      expect(mockPatientFilterService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)
    })

    it('should trigger the download', () => {
      component.exportFile('csv')

      expect(downloadFile).toHaveBeenCalledWith('manager_preview', 'csv', 'File CSV export result')
    })

    it('should show toast in case of error', () => {
      jest
        .spyOn(mockPatientFilterService, 'exportFile')
        .mockImplementation(() => throwError('error'))
      jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()

      component.exportFile('csv')
      expect(mockPatientFilterService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)

      const messageConfig: IToastMessageConfig = {
        ...EXPORT_ERROR,
        messageParameters: {
          format: 'CSV',
        },
      }

      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(messageConfig)
    })
  })

  describe('When the Export JSON Button is clicked', () => {
    beforeEach(() => {
      jest
        .spyOn(mockPatientFilterService, 'getProjectData')
        .mockImplementation(() => of(mockResultFlatList))
      fixture.detectChanges()
      jest.spyOn(mockPatientFilterService, 'exportFile').mockImplementation(() => of('some text'))
    })

    it('should call the ProjectService.exportFile', () => {
      component.exportFile('json')

      expect(mockPatientFilterService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)
    })

    it('should trigger the download', () => {
      component.exportFile('json')
      expect(downloadFile).toHaveBeenCalledWith('manager_preview', 'json', 'some text')
    })

    it('should show toast in case of error', () => {
      jest
        .spyOn(mockPatientFilterService, 'exportFile')
        .mockImplementation(() => throwError('error'))
      jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()

      component.exportFile('json')
      expect(mockPatientFilterService.exportFile).toHaveBeenCalledTimes(1)
      expect(component.isExportLoading).toEqual(false)

      const messageConfig: IToastMessageConfig = {
        ...EXPORT_ERROR,
        messageParameters: {
          format: 'JSON',
        },
      }

      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(messageConfig)
    })
  })
})
