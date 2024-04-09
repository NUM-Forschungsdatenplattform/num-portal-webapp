import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ApprovalOption } from '../../models/approval-option.enum'

import { ProjectEditorApprovalComponent } from './project-editor-approval.component'

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
        NoopAnimationsModule,
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
