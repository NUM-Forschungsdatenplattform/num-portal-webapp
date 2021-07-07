import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IDefinitionList } from 'src/app/shared/models/definition-list.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

import { ProjectEditorAccordionComponent } from './project-editor-accordion.component'

describe('ProjectEditorAccordionComponent', () => {
  let component: ProjectEditorAccordionComponent
  let fixture: ComponentFixture<ProjectEditorAccordionComponent>

  @Component({ selector: 'num-project-editor-general-info', template: '' })
  class StubGeneralInfoComponent {
    @Input() form: any
    @Input() isDisabled: boolean
    @Input() generalInfoData: IDefinitionList[]
  }

  @Component({ selector: 'num-project-editor-cohort-builder', template: '' })
  class StubProjectEditorCohortBuilderComponent {
    @Input() cohortNode: CohortGroupUiModel
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
  }

  @Component({ selector: 'num-project-editor-researchers', template: '' })
  class StubProjectEditorResearchers {
    @Input() researchers: any[]
    @Input() isDisabled: boolean
    @Input() isLoadingComplete: boolean
  }

  @Component({ selector: 'num-project-editor-templates', template: '' })
  class StubProjectEditorTemplatesComponent {
    @Input() templates: any
    @Input() isDisabled: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorAccordionComponent,
        StubGeneralInfoComponent,
        StubProjectEditorCohortBuilderComponent,
        StubProjectEditorResearchers,
        StubProjectEditorTemplatesComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorAccordionComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
