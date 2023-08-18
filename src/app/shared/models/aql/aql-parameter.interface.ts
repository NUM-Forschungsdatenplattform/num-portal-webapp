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

import { IDictionary } from '../dictionary.interface'
import { AqlParameterOperator } from './aql-parameter-operator.type'
import { AqlParameterValueType } from './aql-parameter-value-type.enum'

export interface IAqlParameter {
  name: string
  nameWithDollar: string
  value: string | number | boolean | Date | moment.Moment
  operator: AqlParameterOperator
  possibleOperators: AqlParameterOperator[]
  path: string
  archetypeId: string
  options?: IDictionary<any, any>
  valueType?: AqlParameterValueType
  isMetaFetched?: boolean
  isDisabled: boolean
}
