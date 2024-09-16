import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ProjectCategory } from '../../models/project-category.enum'

import { ProjectEditorGeneralInfoCategoriesInputComponent } from './project-editor-general-info-categories-input.component'

describe('ProjectEditorGeneralInfoCategoriesInputComponent', () => {
  let component: ProjectEditorGeneralInfoCategoriesInputComponent
  let fixture: ComponentFixture<ProjectEditorGeneralInfoCategoriesInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectEditorGeneralInfoCategoriesInputComponent],
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
      // Mock der categories Getter und Setter
      jest.spyOn(component, 'categories', 'get').mockImplementation(() => categories)
      jest.spyOn(component, 'categories', 'set').mockImplementation((value) => (categories = value))
    })

    it('should add category if not a duplicate', () => {
      component.addCategory(mockCategory, null)
      expect(component.categories.length).toEqual(1)
    })

    it('should NOT add the category again if it is now a duplicate', () => {
      component.addCategory(mockCategory, null)
      expect(component.categories.length).toEqual(1)
    })

    it('should remove category', () => {
      component.removeCategory(0) // Then remove it
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
