import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProjectEditorTemplatesComponent } from './project-editor-templates.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'

import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { Component, Input } from '@angular/core'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { ProjectUiModel } from 'src/app/shared/models/project/project-ui.model'

@Component({ selector: 'num-add-templates', template: '' })
class StubAddTemplatesComponent {
  @Input() project: any
  @Input() isDisabled: boolean
}

describe('ProjectEditorTemplatesComponent', () => {
  let component: ProjectEditorTemplatesComponent
  let fixture: ComponentFixture<ProjectEditorTemplatesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorTemplatesComponent, ButtonComponent, StubAddTemplatesComponent],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorTemplatesComponent)
    component = fixture.componentInstance
    component.project = new ProjectUiModel(mockProject1)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
