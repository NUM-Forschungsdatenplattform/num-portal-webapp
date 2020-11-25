import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { StudyEditorConnectorComponent } from './study-editor-connector.component'

describe('StudyEditorConnectorComponent', () => {
  let component: StudyEditorConnectorComponent
  let fixture: ComponentFixture<StudyEditorConnectorComponent>

  @Component({ selector: 'num-study-editor-connector-group', template: '' })
  class GroupStubComponent {
    @Input() cohortGroup: any
    @Input() parentGroupIndex: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorConnectorComponent, GroupStubComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorConnectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
