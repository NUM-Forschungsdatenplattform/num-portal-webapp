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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'

import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { Component, Input } from '@angular/core'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { ProjectUiModel } from '../../../../shared/models/project/project-ui.model'

@Component({ selector: 'num-add-templates', template: '' })
class StubAddTemplatesComponent {
  @Input() project: any
  @Input() isDisabled: boolean
}

describe('ProjectEditorTemplatesComponent', () => {
  let component: ProjectEditorTemplatesComponent
  let fixture: ComponentFixture<ProjectEditorTemplatesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorTemplatesComponent, ButtonComponent, StubAddTemplatesComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorTemplatesComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel(mockProject1)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
