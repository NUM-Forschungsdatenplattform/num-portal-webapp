import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { ProjectEditorResearchersComponent } from './project-editor-researchers.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

describe('ProjectEditorResearchersComponent', () => {
  let component: ProjectEditorResearchersComponent
  let fixture: ComponentFixture<ProjectEditorResearchersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorResearchersComponent, ButtonComponent],
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
        FontAwesomeTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorResearchersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
