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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { LayoutModule } from 'src/app/layout/layout.module'
import { ADD_DIALOG_CONFIG } from 'src/app/modules/projects/components/project-editor-templates/constants'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IProjectTemplateInfoApi } from 'src/app/shared/models/project/project-template-info-api.interface'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { ITemplateMetaDataApi } from 'src/app/shared/models/template/template-api.interface'
import { SharedModule } from 'src/app/shared/shared.module'

import { DataFilterTemplatesComponent } from './data-filter-templates.component'

describe('DataFilterTemplatesComponent', () => {
  let component: DataFilterTemplatesComponent
  let fixture: ComponentFixture<DataFilterTemplatesComponent>

  const templateRow: ITemplateMetaDataApi = {
    templateId: '123',
    archetypeId: '123',
    createdOn: '2020-12-07T21:19:18.980Z',
    name: 'Template test',
  }

  const projectTemplate: IProjectTemplateInfoApi = {
    templateId: templateRow.templateId,
    name: templateRow.name,
  }

  const projectTemplateArr: IProjectTemplateInfoApi[] = [projectTemplate]

  const afterClosedSubject$ = new Subject<IProjectTemplateInfoApi[] | undefined>()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFilterTemplatesComponent],
      imports: [
        BrowserAnimationsModule,
        FontAwesomeModule,
        LayoutModule,
        SharedModule,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: DialogService, useValue: mockDialogService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilterTemplatesComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel()
    component.hitCounter = {}
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
})
