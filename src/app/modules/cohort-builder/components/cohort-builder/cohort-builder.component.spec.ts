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

import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutModule } from 'src/app/layout/layout.module'
import { CohortGroupUiModel } from 'src/app/shared/models/project/cohort-group-ui.model'
import { CohortBuilderComponent } from './cohort-builder.component'

describe('CohortBuilderComponent', () => {
  let component: CohortBuilderComponent
  let fixture: ComponentFixture<CohortBuilderComponent>

  @Component({ selector: 'num-aql-selection', template: '' })
  class StubAqlSelectionComponent {}

  @Component({ selector: 'num-aql-connector-group', template: '' })
  class StubAqlConnectorGroupComponent {
    @Input() cohortGroup: CohortGroupUiModel
    @Input() parentGroupIndex: number[] | null
    @Input() index: number
    @Input() isDisabled: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CohortBuilderComponent,
        StubAqlSelectionComponent,
        StubAqlConnectorGroupComponent,
      ],
      imports: [LayoutModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortBuilderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
