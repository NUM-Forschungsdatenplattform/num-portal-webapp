import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ProjectCategory } from '../../models/project-category.enum'

import { ProjectEditorGeneralInfoCategoriesInputComponent } from './project-editor-general-info-categories-input.component'

describe('StudyEditorGeneralInfoCategoriesInputComponent', () => {
  let component: ProjectEditorGeneralInfoCategoriesInputComponent
  let fixture: ComponentFixture<ProjectEditorGeneralInfoCategoriesInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorGeneralInfoCategoriesInputComponent],
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
    fixture = TestBed.createComponent(ProjectEditorGeneralInfoCategoriesInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  const mockCategory: MatAutocompleteSelectedEvent = {
    option: {
      value: ProjectCategory.Pathology,
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
        ProjectCategory.ClassificationOfDiseaseProgression,
        ProjectCategory.RareDiseases,
      ])
    })

    it('should return []', () => {
      expect(component.filterCategories('Whatever Text')).toEqual([])
    })
  })
})
