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

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { mockAqlCategories } from 'src/mocks/data-mocks/aql-categories.mock'
import { MatSelectHarness } from '@angular/material/select/testing'
import { AqlEditorGeneralInfoComponent } from './aql-editor-general-info.component'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'

describe('AqlEditorGeneralInfoComponent', () => {
  let component: AqlEditorGeneralInfoComponent
  let fixture: ComponentFixture<AqlEditorGeneralInfoComponent>
  let loader: HarnessLoader

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlEditorGeneralInfoComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        PipesModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlEditorGeneralInfoComponent)
    loader = TestbedHarnessEnvironment.loader(fixture)
    component = fixture.componentInstance
    component.form = new FormGroup({
      title: new FormControl(),
      titleTranslated: new FormControl(),
      purpose: new FormControl(),
      purposeTranslated: new FormControl(),
      use: new FormControl(),
      useTranslated: new FormControl(),
      isPublic: new FormControl(),
      category: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('AQL category selection', () => {
    beforeEach(() => {
      component.availableCategories = mockAqlCategories
      fixture.detectChanges()
    })

    it('should provide all available categories as select options', async () => {
      const selectField = await loader.getHarness<MatSelectHarness>(
        MatSelectHarness.with({ selector: '.aql-category-select' })
      )
      // Open the select menu and get available options
      await (await selectField.host()).click()
      const options = await selectField.getOptions()

      expect(options).toHaveLength(mockAqlCategories.length + 1)
    })

    it('should set the category id of the selected value', async () => {
      const selectField = await loader.getHarness<MatSelectHarness>(
        MatSelectHarness.with({
          selector: '.aql-category-select',
        })
      )

      // Open the select menu and select first option
      await (await selectField.host()).click()
      const options = await selectField.getOptions()
      await options[0].click()

      expect(component.form.value.category).toEqual(mockAqlCategories[0].id)
    })

    it('should set category to null on selecting last option', async () => {
      const selectField = await loader.getHarness<MatSelectHarness>(
        MatSelectHarness.with({
          selector: '.aql-category-select',
        })
      )

      // Open the select menu and select first option
      await (await selectField.host()).click()
      const options = await selectField.getOptions()
      await options[0].click()
      expect(component.form.value.category).toEqual(mockAqlCategories[0].id)

      // Select no category ooption
      await options[options.length - 1].click()
      expect(component.form.value.category).toBe(undefined)
    })
  })
})
