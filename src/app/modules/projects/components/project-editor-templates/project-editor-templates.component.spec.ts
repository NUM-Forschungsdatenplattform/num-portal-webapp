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
import { ProjectEditorTemplatesComponent } from './project-editor-templates.component'
import { IProjectTemplateInfoApi } from '../../../../shared/models/project/project-template-info-api.interface'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogAddTemplateComponent } from '../dialog-add-template/dialog-add-template.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { Subject } from 'rxjs'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { ITemplateMetaDataApi } from '../../../../shared/models/template/template-api.interface'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ADD_DIALOG_CONFIG } from './constants'

describe('ProjectEditorTemplatesComponent', () => {
  let component: ProjectEditorTemplatesComponent
  let fixture: ComponentFixture<ProjectEditorTemplatesComponent>

  const selectedTemplateEmitter = new EventEmitter<IProjectTemplateInfoApi[]>()
  @Component({ selector: 'num-add-template-selected-table', template: '' })
  class AddTemplatesSelectedTableStubComponent {
    @Input() selectedTemplates: any
    @Input() isDisabled: boolean
    @Output() selectedTemplatesChange = selectedTemplateEmitter
  }

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

  const afterClosedSubject$ = new Subject()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorTemplatesComponent,
        ButtonComponent,
        AddTemplatesSelectedTableStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
      ],
      providers: [{ provide: DialogService, useValue: mockDialogService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorTemplatesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When template are supposed to be added to the list', () => {
    const dialogContentPayload: IProjectTemplateInfoApi[] = projectTemplateArr
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddTemplateComponent,
      dialogContentPayload,
    }

    it('should open the dialog with the list of existing templates', () => {
      component.templates = projectTemplateArr
      component.isDisabled = false
      fixture.detectChanges()
      component.addTemplate()
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })
  })
})
