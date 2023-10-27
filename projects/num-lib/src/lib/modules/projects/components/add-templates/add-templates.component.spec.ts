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

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'

import { AddTemplatesComponent } from './add-templates.component'
import { ADD_DIALOG_CONFIG } from './constants'
import { LayoutModule } from '@angular/cdk/layout'
import { CohortService } from '../../../../core/services/cohort/cohort.service'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { ToastMessageService } from '../../../../core/services/toast-message/toast-message.service'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { IProjectTemplateInfoApi } from '../../../../shared/models/project/project-template-info-api.interface'
import { ProjectUiModel } from '../../../../shared/models/project/project-ui.model'
import { ITemplateMetaDataApi } from '../../../../shared/models/template/template-api.interface'
import { ToastMessageType } from '../../../../shared/models/toast-message-type.enum'
import { SharedModule } from '../../../../shared/shared.module'

const templateRow: ITemplateMetaDataApi = {
  templateId: 'test-123',
  archetypeId: 'test-123',
  createdOn: '2022-01-10T13:29:18.980Z',
  name: 'Template test',
}

const projectTemplate: IProjectTemplateInfoApi = {
  templateId: templateRow.templateId,
  name: templateRow.name,
}

const projectTemplateArr: IProjectTemplateInfoApi[] = [projectTemplate]

const afterClosedSubject$ = new Subject<IProjectTemplateInfoApi[] | undefined>()
const mockDialogService = {
  openDialog: jest.fn().mockImplementation((_: any) => {
    return {
      afterClosed: () => afterClosedSubject$.asObservable(),
    }
  }),
} as unknown as DialogService

const mockCohortService = {
  getSizeForTemplates: jest.fn(),
} as unknown as CohortService

const mockToastMessageService = {
  openToast: jest.fn(),
} as unknown as ToastMessageService

describe('AddTemplatesComponent', () => {
  let component: AddTemplatesComponent
  let fixture: ComponentFixture<AddTemplatesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTemplatesComponent],
      imports: [BrowserAnimationsModule, SharedModule, LayoutModule, TranslateModule.forRoot()],
      providers: [
        { provide: DialogService, useValue: mockDialogService },
        {
          provide: CohortService,
          useValue: mockCohortService,
        },
        {
          provide: CohortService,
          useValue: mockCohortService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplatesComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel(mockProject1)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When template are supposed to be added to the list', () => {
    const dialogContentPayload: IProjectTemplateInfoApi[] = projectTemplateArr
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentPayload,
    }

    it('should open the dialog with the list of existing templates', () => {
      component.project.templates = projectTemplateArr
      fixture.detectChanges()
      component.addTemplate()
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
      afterClosedSubject$.next([])
      expect(component.project.templates.length).toEqual(0)
    })
  })

  describe('when templates are supposed to be deleted from the list', () => {
    it('should delete them by index', () => {
      component.project.templates = projectTemplateArr
      component.deleteTemplate(0)
      expect(component.project.templates.length).toEqual(0)
    })
  })

  describe('When the user wants to get hits per template', () => {
    const templates = [
      { templateId: 'test1', name: 'testName1' },
      { templateId: 'test2', name: 'testName2' },
      { templateId: 'test3', name: 'testName3' },
    ]

    beforeEach(() => {
      component.project.templates = templates
    })

    it('should call the cohort service to get the hits and success', () => {
      jest.spyOn(mockCohortService, 'getSizeForTemplates').mockImplementation(() => {
        return of({ test1: 1, test2: 2, test3: 3 })
      })

      const { cohortGroup } = component.project.convertToApiInterface()

      component.determineHits()
      expect(mockCohortService.getSizeForTemplates).toHaveBeenCalledWith(cohortGroup, [
        'test1',
        'test2',
        'test3',
      ])
    })

    it('should call the cohort service and display the error message on error', () => {
      jest
        .spyOn(mockCohortService, 'getSizeForTemplates')
        .mockImplementation(() => throwError('Sorry, not today!'))

      const { cohortGroup } = component.project.convertToApiInterface()

      component.determineHits()

      const errorConfig = {
        type: ToastMessageType.Error,
        message: 'PROJECT.HITS.MESSAGE_ERROR_MESSAGE',
      }

      expect(mockCohortService.getSizeForTemplates).toHaveBeenCalledWith(cohortGroup, [
        'test1',
        'test2',
        'test3',
      ])

      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(errorConfig)
    })
  })
})
