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
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { AqlParameterService } from 'src/app/core/services/aql-parameter/aql-parameter.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlParameterValueType } from 'src/app/shared/models/aql/aql-parameter-value-type.enum'
import { IAqlParameterValuesApi } from 'src/app/shared/models/aql/aql-parameter-values.interface'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { mockAql3 } from 'src/mocks/data-mocks/aqls.mock'

import { AqlConnectorItemComponent } from './aql-connector-item.component'

interface ITestCaseForThis {
  parameterValueResponse: Partial<IAqlParameterValuesApi>
  parameters?: IDictionary<string, string | number | boolean>
  expectedType: AqlParameterValueType
  expectedValue: any
}

describe('AqlConnectorItemComponent', () => {
  let component: AqlConnectorItemComponent
  let fixture: ComponentFixture<AqlConnectorItemComponent>

  const mockAqlParameterService = {
    getValues: jest.fn(),
  } as unknown as AqlParameterService

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
        FormsModule,
        MaterialModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: AqlParameterService, useValue: mockAqlParameterService }],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(AqlConnectorItemComponent)
    component = fixture.componentInstance
  })

  describe('When the item gets initialized with parameters', () => {
    const testcases: ITestCaseForThis[] = [
      {
        parameterValueResponse: {
          type: ReferenceModelType.Boolean,
          options: {},
        },
        expectedType: AqlParameterValueType.Boolean,
        expectedValue: true,
      },
      {
        parameterValueResponse: {
          type: ReferenceModelType.Double,
          options: {},
        },
        expectedType: AqlParameterValueType.Double,
        expectedValue: undefined,
      },
      {
        parameterValueResponse: {
          type: ReferenceModelType.Long,
          options: {},
        },
        expectedType: AqlParameterValueType.Number,
        expectedValue: undefined,
      },
      {
        parameterValueResponse: {
          type: ReferenceModelType.Dv_date,
          options: {},
        },
        expectedType: AqlParameterValueType.Date,
        expectedValue: 'A_NEW_DATE',
      },
      {
        parameterValueResponse: {
          type: ReferenceModelType.Dv_coded_text,
          options: {
            test: 'test',
            test2: 'test2',
          },
        },
        expectedType: AqlParameterValueType.Options,
        expectedValue: 'test',
      },
      {
        parameterValueResponse: {
          type: ReferenceModelType.Dv_coded_text,
          options: {},
        },
        expectedType: AqlParameterValueType.String,
        expectedValue: undefined,
      },
    ]
    test.each(testcases)('should configure the parameters', (testcase) => {
      jest
        .spyOn(mockAqlParameterService, 'getValues')
        .mockImplementation(() => of(testcase.parameterValueResponse as IAqlParameterValuesApi))
      component.aql = new AqlUiModel(mockAql3, false, testcase.parameters)

      fixture.detectChanges()
      expect(component.aql.parameters[0].valueType).toEqual(testcase.expectedType)
      const optionKeys = Object.keys(testcase.parameterValueResponse.options)
      if (optionKeys.length) {
        expect(component.aql.parameters[0].value).toEqual(optionKeys[0])
      }
    })
  })

  describe('When the item is supposed to be deleted', () => {
    beforeEach(() => {
      component.aql = new AqlUiModel(mockAql3)
      jest.spyOn(mockAqlParameterService, 'getValues').mockImplementation(() => of())
      fixture.detectChanges()
    })
    it('should emit the delete wish to the parent', () => {
      jest.spyOn(component.deleteItem, 'emit')
      component.deleteSelf()
      expect(component.deleteItem.emit).toHaveBeenCalledTimes(1)
    })
  })
})
