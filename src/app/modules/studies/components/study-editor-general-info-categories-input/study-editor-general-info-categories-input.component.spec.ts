import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { StudyCategory } from '../../models/study-category.enum'

import { StudyEditorGeneralInfoCategoriesInputComponent } from './study-editor-general-info-categories-input.component'

describe('StudyEditorGeneralInfoCategoriesInputComponent', () => {
  let component: StudyEditorGeneralInfoCategoriesInputComponent
  let fixture: ComponentFixture<StudyEditorGeneralInfoCategoriesInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyEditorGeneralInfoCategoriesInputComponent],
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
    fixture = TestBed.createComponent(StudyEditorGeneralInfoCategoriesInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  const mockCategory: MatAutocompleteSelectedEvent = {
    option: {
      value: StudyCategory.Pathology,
    },
  } as MatAutocompleteSelectedEvent

  describe('Adding/Removing Categories', () => {
    beforeEach(() => {
      let categories = []

      jest.spyOn(component, 'categories', 'get').mockImplementation(() => categories)
      jest.spyOn(component, 'categories', 'set').mockImplementation((value) => (categories = value))
    })

    it('should Add Category, if not dublicate', () => {
      component.addCategory(mockCategory, null)
      expect(component.categories.length).toEqual(1)
    })

    it('should NOT add the Category again, since it is now dublicate', () => {
      component.addCategory(mockCategory, null)
      expect(component.categories.length).toEqual(1)
    })

    it('should remove Category', () => {
      component.removeCategory(0)
      expect(component.categories.length).toEqual(0)
    })
  })

  describe('Filtering Categories', () => {
    it('should return 2 categories', () => {
      expect(component.filterCategories('Disease')).toEqual([
        StudyCategory.ClassificationOfDiseaseProgression,
        StudyCategory.RareDiseases,
      ])
    })

    it('should return []', () => {
      expect(component.filterCategories('Whatever Text')).toEqual([])
    })
  })
})
