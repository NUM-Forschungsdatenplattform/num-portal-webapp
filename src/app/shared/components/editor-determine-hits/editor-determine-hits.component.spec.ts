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

import { EditorDetermineHitsComponent } from './editor-determine-hits.component'

import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('EditorDetermineHitsComponent', () => {
  let component: EditorDetermineHitsComponent
  let fixture: ComponentFixture<EditorDetermineHitsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorDetermineHitsComponent, ButtonComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        NoopAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorDetermineHitsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('click on Determine Hits', () => {
    it('should emit the click event', () => {
      jest.spyOn(component.clicked, 'emit')
      component.determineHits()
      expect(component.clicked.emit).toHaveBeenCalledTimes(1)
    })
  })
})
