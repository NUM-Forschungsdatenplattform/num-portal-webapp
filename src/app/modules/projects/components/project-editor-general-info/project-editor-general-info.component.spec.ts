import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../layout/material/material.module'

import { ProjectEditorGeneralInfoComponent } from './project-editor-general-info.component'
import { Component, Input } from '@angular/core'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { ProjectAttachmentUiModel } from '../../../../shared/models/project/project-attachment-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'
import { mockProject2 } from 'src/mocks/data-mocks/project.mock'
import { AttachmentsTableComponent } from 'src/app/shared/components/attachments-table/attachments-table.component'
import { DefinitionListComponent } from 'src/app/shared/components/definition-list/definition-list.component'
import { ProjectEditorGeneralInfoCategoriesInputComponent } from '../project-editor-general-info-categories-input/project-editor-general-info-categories-input.component'
import { ProjectEditorGeneralInfoKeywordsInputComponent } from '../project-editor-general-info-keywords-input/project-editor-general-info-keywords-input.component'

describe('ProjectEditorGeneralInfoComponent', () => {
  let component: ProjectEditorGeneralInfoComponent
  let fixture: ComponentFixture<ProjectEditorGeneralInfoComponent>

  @Component({ selector: 'num-definition-list', template: '' })
  class DefinitionListStubComponent {
    @Input() dataSource: IDefinitionList[]
  }

  @Component({ selector: 'num-project-editor-general-info-keywords-input', template: '' })
  class ProjectEditorGeneralInfoKeywordsInputStubComponent {
    @Input() form: FormGroup
  }

  @Component({ selector: 'num-project-editor-general-info-categories-input', template: '' })
  class ProjectEditorGeneralInfoCategoriesInputStubComponent {
    @Input() form: FormGroup
  }

  @Component({
    selector: 'num-attachments-table',
    template: '',
  })
  class AttachmentsTableStubComponent {
    @Input() attachments: ProjectAttachmentUiModel[]
    @Input() isInPreview: boolean
    @Input() project: ProjectUiModel
    @Input() showSelectColumn: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectEditorGeneralInfoComponent,
        ProjectEditorGeneralInfoKeywordsInputStubComponent,
        ProjectEditorGeneralInfoCategoriesInputStubComponent,
        DefinitionListStubComponent,
        AttachmentsTableStubComponent,
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    })
      .overrideComponent(ProjectEditorGeneralInfoComponent, {
        remove: {
          imports: [
            ProjectEditorGeneralInfoKeywordsInputComponent,
            ProjectEditorGeneralInfoCategoriesInputComponent,
            DefinitionListComponent,
            AttachmentsTableComponent,
          ],
        },
        add: {
          imports: [
            ProjectEditorGeneralInfoKeywordsInputStubComponent,
            ProjectEditorGeneralInfoCategoriesInputStubComponent,
            DefinitionListStubComponent,
            AttachmentsTableStubComponent,
          ],
        },
      })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorGeneralInfoComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel(mockProject2)
    component.isDisabled = false
    component.form = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      simpleDescription: new FormControl(),
      goal: new FormControl(),
      firstHypotheses: new FormControl(),
      secondHypotheses: new FormControl(),
      keywords: new FormControl(),
      categories: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      financed: new FormControl(),
      usedOutsideEu: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
