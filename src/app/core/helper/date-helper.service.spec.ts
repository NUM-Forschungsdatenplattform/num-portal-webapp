import { TestBed } from '@angular/core/testing'

import { DateHelperService } from './date-helper.service'

describe('DateHelperService', () => {
  let service: DateHelperService
  const dateString = '2021-01-02T11:12:13+0000'
  const date = new Date(2021, 0, 2, 11, 12, 13)

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DateHelperService)
    date.getTimezoneOffset = jest.fn().mockImplementation(() => 0)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('Should convert date times as expected', () => {
    const result = DateHelperService.getIsoString(date)
    expect(result).toEqual(dateString)
  })

  it('Should convert dates as expected', () => {
    const result = DateHelperService.getDateString(date)
    expect(result).toEqual('2021-01-02')
  })

  it('Should convert times as expected', () => {
    const result = DateHelperService.getTimeString(date)
    expect(result).toEqual('11:12:13')
  })
})
