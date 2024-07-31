import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
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
        NoopAnimationsModule,
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

  describe('Adding/Removing Keywords', () => {
    let keywords: string[] = []

    beforeEach(() => {
      // Mock der keywords Getter und Setter
      jest.spyOn(component, 'keywords', 'get').mockImplementation(() => keywords)
      jest.spyOn(component, 'keywords', 'set').mockImplementation((value) => (keywords = value))
    })

    it('should add keyword if not a duplicate', () => {
      const keyword = 'keyword 1'
      const event = { input: null, chipInput: null, value: keyword } as MatChipInputEvent
      component.addKeyword(event)
      expect(component.keywords.length).toEqual(1)
      expect(component.keywords).toContain(keyword)
    })

    it('should NOT add the keyword again if it is now a duplicate', () => {
      const keyword = 'keyword 1'
      const event = { input: null, chipInput: null, value: keyword } as MatChipInputEvent
      component.addKeyword(event)
      component.addKeyword(event) // Add again to test duplicate
      expect(component.keywords.length).toEqual(1) // Should still be 1
      expect(component.keywords).toContain(keyword)
    })

    it('should remove keyword', () => {
      const keyword = 'keyword 1'
      const event = { input: null, chipInput: null, value: keyword } as MatChipInputEvent
      component.addKeyword(event) // Add keyword first
      component.removeKeyword(0) // Then remove it
      expect(component.keywords.length).toEqual(0)
    })
  })
})
