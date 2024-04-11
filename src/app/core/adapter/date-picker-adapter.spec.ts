import { Platform } from '@angular/cdk/platform'
import { CustomDatePickerAdapter } from './date-picker-adapter'

describe('DateHelperService', () => {
  let adapter: CustomDatePickerAdapter
  const platform = new Platform({})
  platform.isBrowser = true
  platform.WEBKIT = true
  platform.ANDROID = false
  platform.BLINK = false
  platform.EDGE = false
  platform.FIREFOX = false
  platform.IOS = false
  platform.SAFARI = false
  platform.TRIDENT = false

  const date = new Date(2021, 1, 12)

  beforeEach(() => {
    adapter = new CustomDatePickerAdapter('de', platform)
  })

  it('should be created', () => {
    expect(adapter).toBeTruthy()
  })

  it('should parse german format', () => {
    const result = adapter.parse('12.2.2021')
    expect(result).toEqual(date)
  })

  it('should parse english format', () => {
    const result = adapter.parse('2021/2/12')
    expect(result).toEqual(date)
  })

  it('should parse timestamps', () => {
    const timestamp = date.getTime()
    const result = adapter.parse(timestamp)
    expect(result).toEqual(date)
  })

  test.each(['abc', 'ab.c', 'abcd/ef', '12.bc.2020'])('should return null on invalid', (input) => {
    const result = adapter.parse(input)
    expect(result).toEqual(null)
  })
})
