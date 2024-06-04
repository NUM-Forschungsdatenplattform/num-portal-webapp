import { AqlParameterValueType } from 'src/app/shared/models/aql/aql-parameter-value-type.enum'
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
