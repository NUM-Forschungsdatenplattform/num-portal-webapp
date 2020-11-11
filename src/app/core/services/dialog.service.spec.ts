import { TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'

import { DialogService } from './dialog.service'

describe('Dialog.ServiceService', () => {
  let service: DialogService
  const dialog = ({
    open: () => ({} as MatDialogRef<any, any>),
  } as unknown) as MatDialog

  beforeEach(() => {
    service = new DialogService(dialog)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
