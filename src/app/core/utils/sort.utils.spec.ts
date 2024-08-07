import { v4 as uuidV4, NIL as NIL_UUID } from 'uuid'
import { compareIds, compareLocaleStringValues, compareTimestamps } from './sort.utils'

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

    it('should handle uuid strings', () => {
      expect(compareIds(uuidV4(), NIL_UUID, true)).toBeGreaterThan(0)
      expect(compareIds(NIL_UUID, uuidV4(), true)).toBeLessThan(0)
    })
  })

  describe('Timestamp comparer', () => {
    it('should sort timestamps as expected by Array.sort', () => {
      const timestampA = new Date('2021-01-01T12:00:00.000+01:00').getTime()
      const timestampB = Date.now()
      expect(compareTimestamps(timestampA, timestampB, 1, 2, true)).toBeLessThan(0)
      expect(compareTimestamps(timestampA, timestampB, 1, 2, false)).toBeGreaterThan(0)
    })

    it('should sort equal timestamps by id', () => {
      const timestamp = new Date('2021-02-01T12:00:00.000+01:00').getTime()
      expect(compareTimestamps(timestamp, timestamp, 1, 2, true)).toBeLessThan(0)
      expect(compareTimestamps(timestamp, timestamp, 1, 2, false)).toBeGreaterThan(0)
    })

    it('should accept strings and number values as IDs', () => {
      const timestamp = Date.now()
      expect(compareTimestamps(timestamp, timestamp, '1', 2, true)).toBeLessThan(0)
      expect(compareTimestamps(timestamp, timestamp, 2, '1', false)).toBeLessThan(0)
    })

    it('should handle uuid strings', () => {
      const timestamp = Date.now()
      expect(compareTimestamps(timestamp, timestamp, uuidV4(), NIL_UUID, true)).toBeGreaterThan(0)
      expect(compareTimestamps(timestamp, timestamp, NIL_UUID, uuidV4(), true)).toBeLessThan(0)
    })
  })
})
