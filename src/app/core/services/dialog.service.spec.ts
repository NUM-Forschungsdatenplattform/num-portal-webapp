import { TestBed } from '@angular/core/testing'

import { DialogService } from './dialog.service'

describe('Dialog.ServiceService', () => {
  let service: Dialog.ServiceService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(Dialog.ServiceService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
