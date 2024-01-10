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

import { Input } from '@angular/core'
import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'

import { AqlBuilderWhereComponent } from './aql-builder-where.component'

describe('AqlBuilderWhereComponent', () => {
  let component: AqlBuilderWhereComponent
  let fixture: ComponentFixture<AqlBuilderWhereComponent>

  @Component({ selector: 'num-aql-builder-where-group', template: '' })
  class WhereGroupStubComponent {
    @Input() parentGroupIndex: any
    @Input() group: any
    @Input() index: any
    @Input() dialogMode: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderWhereComponent, WhereGroupStubComponent],
      imports: [FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlBuilderWhereComponent)
    component = fixture.componentInstance
    component.aqbModel = new AqbUiModel()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
