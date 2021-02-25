import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StudyEditorGeneralInfoKeywordsInputComponent } from './study-editor-general-info-keywords-input.component'

describe('StudyEditorGeneralInfoKeywordsInputComponent', () => {
  let component: StudyEditorGeneralInfoKeywordsInputComponent
  let fixture: ComponentFixture<StudyEditorGeneralInfoKeywordsInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorGeneralInfoKeywordsInputComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorGeneralInfoKeywordsInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
