import { Component, Input, Output } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { GenericDialogComponent } from '../components/generic-dialog/generic-dialog.component'

import { DialogService } from './dialog.service'

describe('DialogService', () => {
  let service: DialogService
  const dialog = ({
    open: () => ({} as MatDialogRef<any, any>),
  } as unknown) as MatDialog

  @Component({ selector: 'num-test-component', template: '' })
  class StubComponent {}

  const dialogConfig: DialogConfig = {
    title: 'Test',
    dialogSize: DialogSize.Medium,
    dialogContentComponent: StubComponent,
    dialogContentPayload: {
      test: 'test',
    },
  }

  beforeEach(() => {
    service = new DialogService(dialog)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('On calling openDialog method', () => {
    beforeEach(() => {
      jest.spyOn(dialog, 'open')
    })

    test.each([true, undefined])(
      'should call the matDialog open function with correct parameters',
      (disableClose) => {
        service.openDialog(dialogConfig, disableClose)
        disableClose = disableClose ? true : false
        expect(dialog.open).toHaveBeenCalledWith(GenericDialogComponent, {
          data: dialogConfig,
          disableClose,
        })
      }
    )
  })
})
