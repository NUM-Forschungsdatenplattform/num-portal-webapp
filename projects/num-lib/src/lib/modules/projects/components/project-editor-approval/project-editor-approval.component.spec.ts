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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { ApprovalOption } from '../../models/approval-option.enum'

import { ProjectEditorApprovalComponent } from './project-editor-approval.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'

describe('ProjectEditorApprovalComponent', () => {
  let component: ProjectEditorApprovalComponent
  let fixture: ComponentFixture<ProjectEditorApprovalComponent>

  const form = new FormGroup({
    decision: new FormControl(ApprovalOption.Approve, Validators.required),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorApprovalComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorApprovalComponent)
    component = fixture.componentInstance
    component.form = form
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
