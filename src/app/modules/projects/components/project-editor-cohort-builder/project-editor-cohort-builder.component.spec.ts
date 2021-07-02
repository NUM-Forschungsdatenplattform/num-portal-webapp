import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'

import { ProjectEditorCohortBuilderComponent } from './project-editor-cohort-builder.component'

describe('ProjectEditorCohortBuilderComponent', () => {
  let component: ProjectEditorCohortBuilderComponent
  let fixture: ComponentFixture<ProjectEditorCohortBuilderComponent>

  @Component({ selector: 'num-cohort-builder', template: '' })
  class StubCohortBuilderComponent {
    @Input() cohortNode: CohortGroupUiModel
    @Input() isLoadingComplete: boolean
    @Input() raised: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorCohortBuilderComponent, StubCohortBuilderComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorCohortBuilderComponent)
    component = fixture.componentInstance

    component.cohortNode = new CohortGroupUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
