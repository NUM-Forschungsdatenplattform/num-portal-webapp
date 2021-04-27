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

/**
 * Accepts two string values and compares them case insensitive and with considering locale-
 * specific characters as umlauts ('ö') or accents ('é').
 * Will return a number that can be used for Array.sort as return value for sorting the objects
 * corresponding.
 * If given a value of 'false' to 'isAsc' the result will be inverted.
 *
 * @param a - First string value
 * @param b - Second string value
 * @param idA - ID of element a
 * @param idB - ID of element b
 * @param isAsc - Sort in ascending order
 * @returns Number value that can be used as input for Array.sort
 */
export const compareLocaleStringValues = (
  a: string,
  b: string,
  idA: number,
  idB: number,
  isAsc: boolean
): number => {
  const valA = !!a ? a : ''
  const valB = !!b ? b : ''
  let compareResult = valA.toLocaleLowerCase().localeCompare(valB.toLocaleLowerCase())
  if (compareResult === 0) {
    compareResult = idA - idB
  }
  return compareResult * (isAsc ? 1 : -1)
}

/**
 * Compares the two id values to each other and returns a value that can be used by Array.sort to
 * sort Arrays or lists accordingly.
 *
 * @param aId - First ID
 * @param bId - Second ID
 * @param isAsc - Ascending order desired?
 * @returns - '-1' when aId is before bId, '0' when equal, '1' when aId is after bId
 */
export const compareIds = (aId = -1, bId = -1, isAsc: boolean): number => {
  const compareResult = aId - bId
  return isAsc || compareResult === 0 ? compareResult : -1 * compareResult
}
