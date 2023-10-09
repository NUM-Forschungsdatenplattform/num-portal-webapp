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
import { AqlParameterValueType } from '../../shared/models/aql/aql-parameter-value-type.enum'
import { DateHelperService } from '../helper/date-helper.service'
import { convertParameterInputToType } from './value-converter.utils'
jest.mock('../helper/date-helper.service')

interface ITestCaseForThis {
  type: AqlParameterValueType
  inputValue: string | number | boolean | Date
  defaultToUndefined?: boolean
  expectedValue: any
  expectDateConversion: 'getDateString' | 'getTimeString' | 'getIsoString' | undefined
}
describe('ValueConverter Utils', () => {
  describe('convertParameterInputToType', () => {
    beforeEach(() => {
      jest.spyOn(DateHelperService, 'getDateString').mockImplementation(() => 'DateStringResult')
      jest.spyOn(DateHelperService, 'getTimeString').mockImplementation(() => 'TimeStringResult')
      jest.spyOn(DateHelperService, 'getIsoString').mockImplementation(() => 'IsoStringResult')
      jest.clearAllMocks()
    })
    const testcases: ITestCaseForThis[] = [
      {
        type: AqlParameterValueType.Date,
        inputValue: new Date(),
        defaultToUndefined: false,
        expectDateConversion: 'getDateString',
        expectedValue: 'DateStringResult',
      },
      {
        type: AqlParameterValueType.Time,
        inputValue: new Date(),
        expectDateConversion: 'getTimeString',
        expectedValue: 'TimeStringResult',
      },
      {
        type: AqlParameterValueType.DateTime,
        inputValue: new Date(),
        defaultToUndefined: false,
        expectDateConversion: 'getIsoString',
        expectedValue: 'IsoStringResult',
      },
      {
        type: AqlParameterValueType.Number,
        inputValue: '13',
        defaultToUndefined: false,
        expectDateConversion: undefined,
        expectedValue: 13,
      },
      {
        type: AqlParameterValueType.Double,
        inputValue: '13.3',
        defaultToUndefined: false,
        expectDateConversion: undefined,
        expectedValue: 13.3,
      },
      {
        type: AqlParameterValueType.Number,
        inputValue: 'ab13',
        defaultToUndefined: false,
        expectDateConversion: undefined,
        expectedValue: 0,
      },
      {
        type: AqlParameterValueType.Double,
        inputValue: 'ab13.3',
        defaultToUndefined: false,
        expectDateConversion: undefined,
        expectedValue: 0,
      },
      {
        type: AqlParameterValueType.Number,
        inputValue: 'ab13',
        defaultToUndefined: true,
        expectDateConversion: undefined,
        expectedValue: undefined,
      },
      {
        type: AqlParameterValueType.Double,
        inputValue: 'ab13.3',
        defaultToUndefined: true,
        expectDateConversion: undefined,
        expectedValue: undefined,
      },
      {
        type: AqlParameterValueType.Boolean,
        inputValue: true,
        defaultToUndefined: undefined,
        expectDateConversion: undefined,
        expectedValue: true,
      },
      {
        type: AqlParameterValueType.Boolean,
        inputValue: false,
        defaultToUndefined: undefined,
        expectDateConversion: undefined,
        expectedValue: false,
      },
    ]
    // test.each(testcases)('should work', (testcase) => {
    //   const result = convertParameterInputToType(
    //     testcase.type,
    //     testcase.inputValue,
    //     testcase.defaultToUndefined
    //   )
    //   if (testcase.expectDateConversion) {
    //     expect(DateHelperService[testcase.expectDateConversion]).toHaveBeenCalledWith(
    //       testcase.inputValue
    //     )
    //   }
    //   expect(result).toEqual(testcase.expectedValue)
    // })
  })
})
