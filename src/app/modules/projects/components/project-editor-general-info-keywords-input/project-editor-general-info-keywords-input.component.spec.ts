import { ComponentFixture, TestBed, tick } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { ProjectEditorGeneralInfoKeywordsInputComponent } from './project-editor-general-info-keywords-input.component'
import { MatChipInputEvent } from '@angular/material/chips'

describe('ProjectEditorGeneralInfoKeywordsInputComponent', () => {
  let component: ProjectEditorGeneralInfoKeywordsInputComponent
  let fixture: ComponentFixture<ProjectEditorGeneralInfoKeywordsInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorGeneralInfoKeywordsInputComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditorGeneralInfoKeywordsInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  const mockKeyword: MatChipInputEvent = {
    input: null,
    value: 'keyword 1',
  }

  describe('Adding/Removing Keywords', () => {
    beforeEach(() => {
      let keywords = []

      jest.spyOn(component, 'keywords', 'get').mockImplementation(() => keywords)
      jest.spyOn(component, 'keywords', 'set').mockImplementation((value) => (keywords = value))
    })

    it('should Add Keyword, if not dublicate', () => {
      component.addKeyword(mockKeyword)
      expect(component.keywords.length).toEqual(1)
    })

    it('should NOT add the Keyword again, since it is now dublicate', () => {
      component.addKeyword(mockKeyword)
      expect(component.keywords.length).toEqual(1)
    })

    it('should remove Keyword', () => {
      component.removeKeyword(0)
      expect(component.keywords.length).toEqual(0)
    })
  })
})
