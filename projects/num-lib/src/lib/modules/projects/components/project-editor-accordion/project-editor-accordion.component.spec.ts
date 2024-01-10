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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'


import { ProjectEditorAccordionComponent } from './project-editor-accordion.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { CohortGroupUiModel } from '../../../../shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from '../../../../shared/models/project/project-ui.model'

describe('ProjectEditorAccordionComponent', () => {
  let component: ProjectEditorAccordionComponent
  let fixture: ComponentFixture<ProjectEditorAccordionComponent>

  @Component({ selector: 'num-project-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
    @Input() isDisabled: boolean
    @Input() generalInfoData: IDefinitionList[]
  }

  @Component({ selector: 'num-project-editor-cohort-builder', template: '' })
  class StubProjectEditorCohortBuilderComponent {
    @Input() cohortNode: CohortGroupUiModel
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
    @Input() determineHitsContent: any
    @Output() determineHitsClicked = new EventEmitter()
  }

  @Component({ selector: 'num-project-editor-researchers', template: '' })
  class StubProjectEditorResearchers {
    @Input() researchers: any[]
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
  }

  @Component({ selector: 'num-project-editor-templates', template: '' })
  class StubProjectEditorTemplatesComponent {
    @Input() templates: any
    @Input() isDisabled: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorAccordionComponent,
        StubGeneralInfoComponent,
        StubProjectEditorCohortBuilderComponent,
        StubProjectEditorResearchers,
        StubProjectEditorTemplatesComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        ,
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorAccordionComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
