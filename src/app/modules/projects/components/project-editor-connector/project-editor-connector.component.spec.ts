import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { ProjectEditorConnectorComponent } from './project-editor-connector.component'

describe('StudyEditorConnectorComponent', () => {
  let component: ProjectEditorConnectorComponent
  let fixture: ComponentFixture<ProjectEditorConnectorComponent>

  @Component({ selector: 'num-study-editor-connector-group', template: '' })
  class GroupStubComponent {
    @Input() cohortGroup: any
    @Input() parentGroupIndex: any
    @Input() isDisabled: boolean
  }

  @Component({ selector: 'num-editor-determine-hits', template: '' })
  class EditorDetermineHitsComponent {
    @Input() isButtonDisabled: boolean
    @Input() content: IDetermineHits
    @Output() clicked = new EventEmitter()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProjectEditorConnectorComponent,
        EditorDetermineHitsComponent,
        GroupStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorConnectorComponent)
    component = fixture.componentInstance
    component.cohortNode = new CohortGroupUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
