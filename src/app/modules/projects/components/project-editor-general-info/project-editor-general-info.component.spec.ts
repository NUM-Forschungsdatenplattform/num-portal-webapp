import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { ProjectEditorGeneralInfoComponent } from './project-editor-general-info.component'
import { Component, Input } from '@angular/core'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'

describe('ProjectEditorGeneralInfoComponent', () => {
  let component: ProjectEditorGeneralInfoComponent
  let fixture: ComponentFixture<ProjectEditorGeneralInfoComponent>

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  @Component({ selector: 'num-project-editor-general-info-keywords-input', template: '' })
  class ProjectEditorGeneralInfoKeywordsInputComponent {
    @Input() form: FormGroup
  }

  @Component({ selector: 'num-project-editor-general-info-categories-input', template: '' })
  class ProjectEditorGeneralInfoCategoriesInputComponent {
    @Input() form: FormGroup
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorGeneralInfoComponent,
        DefinitionListStubComponent,
        ProjectEditorGeneralInfoKeywordsInputComponent,
        ProjectEditorGeneralInfoCategoriesInputComponent,
      ],
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
    fixture = TestBed.createComponent(ProjectEditorGeneralInfoComponent)
    component = fixture.componentInstance
    component.isDisabled = false
    component.form = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      goal: new FormControl(),
      firstHypotheses: new FormControl(),
      secondHypotheses: new FormControl(),
      keywords: new FormControl(),
      categories: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      financed: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
