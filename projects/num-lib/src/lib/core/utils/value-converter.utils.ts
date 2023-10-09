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
import { Moment } from 'moment'

export const convertParameterInputToType = (
  type: AqlParameterValueType,
  inputValue: string | number | boolean | Date | Moment,
  defaultToUndefined = false
): number | string | boolean => {
  let outputValue: number | string | boolean
  switch (type) {
    case AqlParameterValueType.Date:
      outputValue = DateHelperService.getDateString(inputValue as Moment)
      break
    case AqlParameterValueType.Time:
      outputValue = DateHelperService.getTimeString(inputValue as Moment)
      break
    case AqlParameterValueType.DateTime:
      outputValue = DateHelperService.getIsoString(inputValue as Moment)
      break
    case AqlParameterValueType.Number:
      outputValue = parseInt(inputValue as string, 10)
      outputValue = isNaN(outputValue) ? (defaultToUndefined ? undefined : 0) : outputValue
      break
    case AqlParameterValueType.Double:
      outputValue = parseFloat(inputValue?.toString().replace(',', '.'))
      outputValue = isNaN(outputValue) ? (defaultToUndefined ? undefined : 0) : outputValue
      break
    case AqlParameterValueType.Boolean:
      outputValue = inputValue && inputValue !== 'false'
      break

    default:
      outputValue = inputValue ? inputValue.toString() : defaultToUndefined ? undefined : ' '
      break
  }
  return outputValue
}
