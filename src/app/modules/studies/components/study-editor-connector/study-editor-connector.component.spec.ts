import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StudyEditorConnectorComponent } from './study-editor-connector.component'

describe('StudyEditorConnectorComponent', () => {
  let component: StudyEditorConnectorComponent
  let fixture: ComponentFixture<StudyEditorConnectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorConnectorComponent],
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
