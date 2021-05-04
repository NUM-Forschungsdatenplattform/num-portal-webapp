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

import { compareIds, compareLocaleStringValues } from './sort.utils'

describe('Sort utils', () => {
  describe('Locale string comparer', () => {
    it('should compare values for non locale specific values', () => {
      expect(compareLocaleStringValues('abc', 'cba', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues('cba', 'abc', 0, 1, true)).toBeGreaterThan(0)
      expect(compareLocaleStringValues('abc', 'cba', 0, 1, false)).toBeGreaterThan(0)
      expect(compareLocaleStringValues('cba', 'abc', 0, 1, false)).toBeLessThan(0)
    })

    it('should sort by id if string values are equal', () => {
      expect(compareLocaleStringValues('abc', 'abc', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues('abc', 'abc', 0, 1, false)).toBeGreaterThan(0)
    })

    it('should compare case insensitive', () => {
      expect(compareLocaleStringValues('ABC', 'abc', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues('ABC', 'abc', 0, 1, false)).toBeGreaterThan(0)
      expect(compareLocaleStringValues('abc', 'ABC', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues('abc', 'ABC', 0, 1, false)).toBeGreaterThan(0)
    })

    it('should consider locale specific characters', () => {
      expect(compareLocaleStringValues('ä', 'Ä', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues('ä', 'Ä', 0, 1, false)).toBeGreaterThan(0)
      expect(compareLocaleStringValues('o', 'Ö', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues('o', 'Ö', 0, 1, false)).toBeGreaterThan(0)
      expect(compareLocaleStringValues('é', 'e', 0, 1, true)).toBeGreaterThan(0)
      expect(compareLocaleStringValues('é', 'E', 0, 1, true)).toBeGreaterThan(0)
    })

    it('should handle empty, null and undefined values', () => {
      expect(compareLocaleStringValues('', 'a', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues('', 'a', 0, 1, false)).toBeGreaterThan(0)
      expect(compareLocaleStringValues(null, 'a', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues(null, 'a', 0, 1, false)).toBeGreaterThan(0)
      expect(compareLocaleStringValues(undefined, 'a', 0, 1, true)).toBeLessThan(0)
      expect(compareLocaleStringValues(undefined, 'a', 0, 1, false)).toBeGreaterThan(0)
    })
  })

  describe('ID comparer', () => {
    it('should compare IDs as expected by Array.sort', () => {
      expect(compareIds(0, 1, true)).toBeLessThan(0)
      expect(compareIds(0, 1, false)).toBeGreaterThan(0)
      expect(compareIds(1, 1, true)).toEqual(0)
      expect(compareIds(1, 1, false)).toEqual(0)
    })

    it('should handle null or undefined values', () => {
      expect(compareIds(null, 1, true)).toBeLessThan(0)
      expect(compareIds(undefined, 1, true)).toBeLessThan(0)
    })

    it('should accept string and number values', () => {
      expect(compareIds('1', '2', true)).toBeLessThan(0)
      expect(compareIds('2', 1, true)).toBeGreaterThan(0)
    })

    it('should handle NaN strings as -1', () => {
      expect(compareIds('noId', 2, true)).toBeLessThan(0)
      expect(compareIds(1, 'NaN', true)).toBeGreaterThan(0)
    })
  })
})
