import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ApprovalOption } from '../../models/approval-option.enum'

import { StudyEditorApprovalComponent } from './study-editor-approval.component'

describe('StudyEditorApprovalComponent', () => {
  let component: StudyEditorApprovalComponent
  let fixture: ComponentFixture<StudyEditorApprovalComponent>

  const form = new FormGroup({
    decision: new FormControl(ApprovalOption.Approve, Validators.required),
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorApprovalComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorApprovalComponent)
    component = fixture.componentInstance
    component.form = form
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
