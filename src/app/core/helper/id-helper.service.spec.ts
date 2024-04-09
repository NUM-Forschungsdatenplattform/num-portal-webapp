import { TestBed } from '@angular/core/testing'

import { IdHelperService } from './id-helper.service'

describe('IdHelperService', () => {
  let service: IdHelperService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(IdHelperService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should generate a simple id on getSimpleId method', () => {
    const id = IdHelperService.getSimpleId()
    expect(id.length).toEqual(5)
    expect(id.split('x').length).toEqual(2)
  })
})
