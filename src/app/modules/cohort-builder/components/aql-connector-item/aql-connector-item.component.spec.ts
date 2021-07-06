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

import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { AqlParameterService } from 'src/app/core/services/aql-parameter/aql-parameter.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { mockAql3 } from 'src/mocks/data-mocks/aqls.mock'

import { AqlConnectorItemComponent } from './aql-connector-item.component'

describe('AqlConnectorItemComponent', () => {
  let component: AqlConnectorItemComponent
  let fixture: ComponentFixture<AqlConnectorItemComponent>

  const mockAqlParameterService = ({
    getValues: jest.fn(),
  } as unknown) as AqlParameterService

  const valueChangeEmitter = new EventEmitter()
  @Component({ selector: 'num-aql-parameter-inputs', template: '' })
  class AqlParameterInputsComponent {
    @Input() item: any
    @Input() disabled: boolean
    @Output() valueChange = valueChangeEmitter
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlConnectorItemComponent, AqlParameterInputsComponent],
      imports: [
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AqlParameterService, useValue: mockAqlParameterService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlConnectorItemComponent)
    component = fixture.componentInstance
    component.aql = new AqlUiModel(mockAql3)
    jest.spyOn(mockAqlParameterService, 'getValues').mockImplementation(() => of())
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the item is supposed to be deleted', () => {
    it('should emit the delete wish to the parent', () => {
      jest.spyOn(component.deleteItem, 'emit')
      component.deleteSelf()
      expect(component.deleteItem.emit).toHaveBeenCalledTimes(1)
    })
  })
})
