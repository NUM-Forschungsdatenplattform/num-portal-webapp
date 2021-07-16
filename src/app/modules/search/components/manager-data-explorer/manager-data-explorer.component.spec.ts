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
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { PatientFilterService } from 'src/app/core/services/patient-filter/patient-filter.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { mockSimpleContainment } from 'src/mocks/data-mocks/aqb/simple-containment.mock'
import { mockCohort1 } from 'src/mocks/data-mocks/cohorts.mock'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { mockResultFlatList } from 'src/mocks/data-mocks/result-set-mock'

import { ManagerDataExplorerComponent } from './manager-data-explorer.component'

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
  const mockPatientFilterService = ({
    projectDataObservable$: mockResultSetSubject$.asObservable(),
    getProjectData: jest.fn(),
    setCurrentProject: jest.fn(),
  } as unknown) as PatientFilterService

  const mockAqlEditorService = ({
    buildAql: jest.fn(),
    getContainment: jest.fn(),
  } as unknown) as AqlEditorService

  const mockToastMessageService = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const mockRouter = ({
    navigate: jest.fn(),
  } as unknown) as Router

  const resolvedData: ProjectUiModel = new ProjectUiModel(mockProject1)
  resolvedData.addCohortGroup(mockCohort1.cohortGroup)
  resolvedData.templates = [
    { templateId: 'test1', name: 'testName1' },
    { templateId: 'test2', name: 'testName2' },
    { templateId: 'test3', name: 'testName3' },
  ]
  const mockActivatedRoute = ({
    snapshot: {
      data: {
        resolvedData,
      },
    },
  } as unknown) as ActivatedRoute

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
          provide: AqlEditorService,
          useValue: mockAqlEditorService,
        },
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

  const buildResponse: IArchetypeQueryBuilderResponse = {
    q: 'result string',
    parameters: {},
  }

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(ManagerDataExplorerComponent)
    component = fixture.componentInstance
    jest
      .spyOn(mockAqlEditorService, 'getContainment')
      .mockImplementation(() => of(mockSimpleContainment))

    jest.spyOn(mockAqlEditorService, 'buildAql').mockImplementation(() => of(buildResponse))
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

  describe('When no compiled query is present', () => {
    beforeEach(() => {
      component.compiledQuery = undefined
      component.getData()
    })
    it('should not call the data retrieval service', () => {
      expect(mockPatientFilterService.getProjectData).not.toHaveBeenCalled()
    })
  })

  describe('When there is an error building the AQL', () => {
    beforeEach(() => {
      jest
        .spyOn(mockAqlEditorService, 'getContainment')
        .mockImplementation(() => throwError('Error building AQL'))
      fixture.detectChanges()
    })

    it('should show a message to the user', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith({
        message: 'DATA_EXPLORER.CONFIGURATION_ERROR',
        type: ToastMessageType.Error,
      })
    })

    it('should set the loading status back to false', () => {
      expect(component.isDataSetLoading).toBe(false)
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

  describe('On init', () => {
    it('should prepare the AQL query', () => {
      fixture.detectChanges()
      expect(mockAqlEditorService.buildAql).toHaveBeenCalled()
      expect(component.isAqlPrepared).toBe(true)
    })
  })
})
