import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { StudyEditorGeneralInfoComponent } from './study-editor-general-info.component'

describe('StudyEditorGeneralInfoComponent', () => {
  let component: StudyEditorGeneralInfoComponent
  let fixture: ComponentFixture<StudyEditorGeneralInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorGeneralInfoComponent],
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
    fixture = TestBed.createComponent(StudyEditorGeneralInfoComponent)
    component = fixture.componentInstance
    component.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      firstHypotheses: new FormControl(),
      secondHypotheses: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
