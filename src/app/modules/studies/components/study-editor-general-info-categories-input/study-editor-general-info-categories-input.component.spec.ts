import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StudyEditorGeneralInfoCategoriesInputComponent } from './study-editor-general-info-categories-input.component'

describe('StudyEditorGeneralInfoCategoriesInputComponent', () => {
  let component: StudyEditorGeneralInfoCategoriesInputComponent
  let fixture: ComponentFixture<StudyEditorGeneralInfoCategoriesInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorGeneralInfoCategoriesInputComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorGeneralInfoCategoriesInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
