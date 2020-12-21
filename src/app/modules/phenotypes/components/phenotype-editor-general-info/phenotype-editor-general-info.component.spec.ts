import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { PhenotypeEditorGeneralInfoComponent } from './phenotype-editor-general-info.component'

describe('PhenotypeEditorGeneralInfoComponent', () => {
  let component: PhenotypeEditorGeneralInfoComponent
  let fixture: ComponentFixture<PhenotypeEditorGeneralInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhenotypeEditorGeneralInfoComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenotypeEditorGeneralInfoComponent)
    component = fixture.componentInstance
    component.form = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
