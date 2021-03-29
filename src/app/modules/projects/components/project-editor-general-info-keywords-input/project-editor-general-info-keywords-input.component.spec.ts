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
