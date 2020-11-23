import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StudyEditorConnectorGroupComponent } from './study-editor-connector-group.component'

describe('StudyEditorConnectorGroupComponent', () => {
  let component: StudyEditorConnectorGroupComponent
  let fixture: ComponentFixture<StudyEditorConnectorGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorConnectorGroupComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorConnectorGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
