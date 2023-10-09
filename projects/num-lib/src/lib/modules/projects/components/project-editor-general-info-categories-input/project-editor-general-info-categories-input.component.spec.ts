/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { ProjectCategory } from '../../models/project-category.enum'

import { ProjectEditorGeneralInfoCategoriesInputComponent } from './project-editor-general-info-categories-input.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'

describe('ProjectEditorGeneralInfoCategoriesInputComponent', () => {
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
