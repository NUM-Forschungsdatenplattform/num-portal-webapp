import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StudyEditorButtonsComponent } from './study-editor-buttons.component'

describe('StudyEditorButtonsComponent', () => {
  let component: StudyEditorButtonsComponent
  let fixture: ComponentFixture<StudyEditorButtonsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorButtonsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorButtonsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
