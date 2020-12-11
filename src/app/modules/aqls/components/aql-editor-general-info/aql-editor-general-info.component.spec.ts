import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlEditorGeneralInfoComponent } from './aql-editor-general-info.component'

describe('AqlEditorGeneralInfoComponent', () => {
  let component: AqlEditorGeneralInfoComponent
  let fixture: ComponentFixture<AqlEditorGeneralInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlEditorGeneralInfoComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlEditorGeneralInfoComponent)
    component = fixture.componentInstance
    component.form = new FormGroup({
      title: new FormControl(),
      purpose: new FormControl(),
      use: new FormControl(),
      isPublic: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
