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
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { AqbWhereGroupUiModel } from '../../../../shared/models/aqb/aqb-where-group-ui.model'

import { AqlBuilderWhereGroupComponent } from './aql-builder-where-group.component'

describe('AqlBuilderWhereGroupComponent', () => {
  let component: AqlBuilderWhereGroupComponent
  let fixture: ComponentFixture<AqlBuilderWhereGroupComponent>

  @Component({ selector: 'num-aql-builder-where-item', template: '' })
  class WhereItemStubComponent {
    @Input() item: any
    @Input() dialogMode: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderWhereGroupComponent, ButtonComponent, WhereItemStubComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        PipesModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderWhereGroupComponent)
    component = fixture.componentInstance
    component.group = new AqbWhereGroupUiModel()
    component.parentGroupIndex = null
    component.index = 0

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
