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
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectAttachmentUiModel } from 'src/app/shared/models/project/project-attachment-ui.model'
import { ProjectStatus } from 'src/app/shared/models/project/project-status.enum'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

import { ProjectEditorAccordionComponent } from './project-editor-accordion.component'

describe('ProjectEditorAccordionComponent', () => {
  let component: ProjectEditorAccordionComponent
  let fixture: ComponentFixture<ProjectEditorAccordionComponent>

  @Component({ selector: 'num-project-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() attachments: ProjectAttachmentUiModel[]
    @Input() form: UntypedFormGroup
    @Input() isDisabled: boolean
    @Input() generalInfoData: IDefinitionList[]
    @Input() showAttachmentSelects: boolean
    @Input() projectStatus: ProjectStatus
  }

  @Component({ selector: 'num-project-editor-cohort-builder', template: '' })
  class StubProjectEditorCohortBuilderComponent {
    @Input() cohortNode: CohortGroupUiModel
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
    @Input() isCohortValid: boolean
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
    @Input() project: ProjectUiModel
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
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
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
