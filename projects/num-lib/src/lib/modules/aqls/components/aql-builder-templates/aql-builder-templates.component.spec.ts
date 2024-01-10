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
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/app/layout/material/material.module'

import { AqlBuilderTemplatesComponent } from './aql-builder-templates.component'

describe('AqlBuilderTemplatesComponent', () => {
  let component: AqlBuilderTemplatesComponent
  let fixture: ComponentFixture<AqlBuilderTemplatesComponent>

  @Component({ selector: 'num-aql-builder-template-tree', template: '' })
  class TemplatesStubComponent {
    @Input() templateId: any

    @Input() mode: any
    @Input() selectDestination: any
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlBuilderTemplatesComponent, TemplatesStubComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(AqlBuilderTemplatesComponent)
    component = fixture.componentInstance
    component.selectedTemplates = new FormControl()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the flag that the view is rendered after the view got initialized', async () => {
    await fixture.whenStable()
    expect(component.isViewRendered).toBeTruthy()
  })

  test.each([true, false])(
    'should not set the flag that the view is rendered after the view got initialized',
    async (isRendered) => {
      const callCatcher = jest.fn()

      Object.defineProperty(component, 'isViewRendered', {
        get(): boolean {
          return isRendered
        },
        set(_): void {
          callCatcher()
        },
      })

      await fixture.whenStable()
      jest.clearAllMocks()
      fixture.detectChanges()
      await fixture.whenStable()

      if (isRendered) {
        expect(callCatcher).not.toHaveBeenCalled()
      } else {
        expect(callCatcher).toHaveBeenCalled()
      }
    }
  )
})
