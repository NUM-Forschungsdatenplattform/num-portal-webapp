import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { StudyEditorGeneralInfoComponent } from './study-editor-general-info.component'
import { Component, Input } from '@angular/core'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'

describe('StudyEditorGeneralInfoComponent', () => {
  let component: StudyEditorGeneralInfoComponent
  let fixture: ComponentFixture<StudyEditorGeneralInfoComponent>

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorGeneralInfoComponent, DefinitionListStubComponent],
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
    component.isDisabled = false
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
