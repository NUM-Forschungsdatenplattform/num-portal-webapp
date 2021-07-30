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

import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ManagerToolsComponent } from './manager-tools.component'

describe('ManagerToolsComponent', () => {
  let component: ManagerToolsComponent
  let fixture: ComponentFixture<ManagerToolsComponent>

  @Component({ selector: 'num-manager-charts', template: '' })
  class ManagerChartsComponent {}
  @Component({ selector: 'num-pseudonym-resolver', template: '' })
  class PseudonymResolverComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerChartsComponent, PseudonymResolverComponent],
      imports: [],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerToolsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
