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

import { MatSort } from '@angular/material/sort'
import { DataExplorerProjectTableColumns } from '../../shared/models/project/data-explorer-project-table.interface'
import { IProjectApi } from '../../shared/models/project/project-api.interface'
import { ProjectTableColumns } from '../../shared/models/project/project-table.interface'
import { ApprovedUsersTableColumn } from '../../shared/models/user/approved-table-column.interface'
import { UnapprovedUsersTableColumn } from '../../shared/models/user/unapproved-table-column.interface'
import { IUser } from '../../shared/models/user/user.interface'


/**
 * Tries to parse an ID string into a number value if string contains only number values or -1 if
 * the string could not be parsed.
 *
 * @param id - ID to parse
 * @returns Number value of ID string if parseable or -1
 */
export const parseIdToNumber = (id: string): number => {
  return !isNaN(parseInt(id, 10)) ? parseInt(id, 10) : -1
}

/**
 *
 * @param aId - First ID
 * @param bId - Second ID
 * @returns Compare number value that can be accepted by Array.sort
 */
export const compareIdsWithoutDirection = (aId: string | number, bId: string | number): number => {
  const a = typeof aId === 'number' ? aId : /^\d$/.test(aId) ? parseIdToNumber(aId) : aId
  const b = typeof bId === 'number' ? bId : /^\d$/.test(bId) ? parseIdToNumber(bId) : bId

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  } else if (typeof a === 'number' && typeof b === 'string') {
    return a.toString().localeCompare(b)
  } else if (typeof a === 'string' && typeof b === 'number') {
    return b.toString().localeCompare(a) * -1
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b)
  } else {
    // This should never happen
    return -1
  }
}

/**
 * Accepts two string values and compares them case insensitive and with considering locale-
 * specific characters as umlauts ('ö') or accents ('é').
 * Will return a number that can be used for Array.sort as return value for sorting the objects
 * corresponding.
 * If given a value of 'false' to 'isAsc' the result will be inverted.
 *
 * @param a - First string value
 * @param b - Second string value
 * @param aId - ID of element a
 * @param bId - ID of element b
 * @param isAsc - Sort in ascending order
 * @returns Number value that can be used as input for Array.sort
 */
export const compareLocaleStringValues = (
  a: string,
  b: string,
  aId: string | number,
  bId: string | number,
  isAsc: boolean
): number => {
  const valA = a ? a : ''
  const valB = b ? b : ''
  let compareResult = valA.toLocaleLowerCase().localeCompare(valB.toLocaleLowerCase())
  if (compareResult === 0) {
    compareResult = compareIdsWithoutDirection(aId, bId)
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
export const compareIds = (aId: string | number, bId: string | number, isAsc: boolean): number => {
  const compareResult = compareIdsWithoutDirection(aId, bId)
  return isAsc || compareResult === 0 ? compareResult : -1 * compareResult
}

/**
 * Compares two timestamp values and returns a number value expected by Array.sort(). If both
 * timestamps are equal the IDs will be used for comparision with the same order as requested by
 * isAsc.
 *
 * @param aValue - First timestamp
 * @param bValue - Second timestamp
 * @param aId - ID of the first item
 * @param bId - ID of the second item
 * @param isAsc - Is ascending sort requested?
 * @returns Sort value for Array.sort
 */
export const compareTimestamps = (
  aValue: number,
  bValue: number,
  aId: string | number,
  bId: string | number,
  isAsc: boolean
): number => {
  let compareResult = aValue - bValue
  if (compareResult === 0) {
    compareResult = compareIdsWithoutDirection(aId, bId)
  }
  return isAsc ? compareResult : -1 * compareResult
}

/**
 * Sorts all user lists by the given sort directive. Can be used for all user lists.
 *
 * @param data - User array
 * @param sort - Sort info from sortHeader
 */
export const sortUsers = (data: IUser[], sort: MatSort): IUser[] => {
  const isAsc = sort.direction === 'asc'
  const newData = [...data]

  switch (sort.active as ApprovedUsersTableColumn | UnapprovedUsersTableColumn) {
    case 'createdTimestamp': {
      return newData.sort((a, b) =>
        compareTimestamps(a.createdTimestamp, b.createdTimestamp, a.id, b.id, isAsc)
      )
    }
    case 'email': {
      return newData.sort((a, b) => compareLocaleStringValues(a.email, b.email, a.id, b.id, isAsc))
    }
    case 'firstName': {
      return newData.sort((a, b) =>
        compareLocaleStringValues(a.firstName, b.firstName, a.id, b.id, isAsc)
      )
    }
    case 'lastName': {
      return newData.sort((a, b) =>
        compareLocaleStringValues(a.lastName, b.lastName, a.id, b.id, isAsc)
      )
    }
    case 'organization': {
      return newData.sort((a, b) =>
        compareLocaleStringValues(
          a.organization?.name || '',
          b.organization?.name || '',
          a.id,
          b.id,
          isAsc
        )
      )
    }
    default: {
      return newData.sort((a, b) => compareIds(a.id, b.id, isAsc))
    }
  }
}

/**
 * Sorts all project related lists by the given sort directive. Can be used for all project lists.
 * TranslationService is optional
 *
 * @param data - Project array
 * @param sort - Sort info from sortHeader
 * @param translateService - To translate certain values
 */
export const sortProjects = (
  data: IProjectApi[],
  sort: MatSort,
): IProjectApi[] => {
  const isAsc = sort.direction === 'asc'
  const newData = [...data]

  switch (sort.active as ProjectTableColumns | DataExplorerProjectTableColumns) {
    case 'author': {
      return newData.sort((a, b) =>
        compareLocaleStringValues(
          `${a.coordinator?.firstName || ''} ${a.coordinator?.lastName || ''}`,
          `${b.coordinator?.firstName || ''} ${b.coordinator?.lastName || ''}`,
          a.id,
          b.id,
          isAsc
        )
      )
    }
    case 'name': {
      return newData.sort((a, b) => compareLocaleStringValues(a.name, b.name, a.id, b.id, isAsc))
    }
    case 'organization': {
      return newData.sort((a, b) =>
        compareLocaleStringValues(
          `${a.coordinator?.organization?.name || ''}`,
          `${b.coordinator?.organization?.name || ''}`,
          a.id,
          b.id,
          isAsc
        )
      )
    }
    case 'status': {
      return newData.sort((a, b) =>
        compareLocaleStringValues(
          `PROJECT.STATUS.${a.status}` || a.status,
          `PROJECT.STATUS.${b.status}` || b.status,
          a.id,
          b.id,
          isAsc
        )
      )
    }
    case 'createDate': {
      return newData.sort((a, b) =>
        compareLocaleStringValues(
          `${a.createDate || ''}`,
          `${b.createDate || ''}`,
          a.id,
          b.id,
          isAsc
        )
      )
    }
    default: {
      return newData.sort((a, b) => {
        const compareResult = a.id - b.id
        return isAsc ? compareResult : compareResult * -1
      })
    }
  }
}
