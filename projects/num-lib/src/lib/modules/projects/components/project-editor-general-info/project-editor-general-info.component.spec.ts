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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { ProjectEditorGeneralInfoComponent } from './project-editor-general-info.component'
import { Component, Input } from '@angular/core'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'

describe('ProjectEditorGeneralInfoComponent', () => {
  let component: ProjectEditorGeneralInfoComponent
  let fixture: ComponentFixture<ProjectEditorGeneralInfoComponent>

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  @Component({ selector: 'num-project-editor-general-info-keywords-input', template: '' })
  class ProjectEditorGeneralInfoKeywordsInputComponent {
    @Input() form: FormGroup
  }

  @Component({ selector: 'num-project-editor-general-info-categories-input', template: '' })
  class ProjectEditorGeneralInfoCategoriesInputComponent {
    @Input() form: FormGroup
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorGeneralInfoComponent,
        DefinitionListStubComponent,
        ProjectEditorGeneralInfoKeywordsInputComponent,
        ProjectEditorGeneralInfoCategoriesInputComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorGeneralInfoComponent)
    component = fixture.componentInstance
    component.isDisabled = false
    component.form = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      simpleDescription: new FormControl(),
      goal: new FormControl(),
      firstHypotheses: new FormControl(),
      secondHypotheses: new FormControl(),
      keywords: new FormControl(),
      categories: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      financed: new FormControl(),
      usedOutsideEu: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
