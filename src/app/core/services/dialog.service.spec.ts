import { Component } from '@angular/core'
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

  const dialogConfig = {
    title: 'Test',
    dialogContentComponent: StubComponent,
    dialogContentPayload: {
      test: 'test',
    },
  }

  const dialogConfigSmall: DialogConfig = {
    ...dialogConfig,
    dialogSize: DialogSize.Small,
  }
  const dialogConfigMedium: DialogConfig = {
    ...dialogConfig,
    dialogSize: DialogSize.Medium,
  }
  const dialogConfigLarge: DialogConfig = {
    ...dialogConfig,
    dialogSize: DialogSize.Large,
  }

  const sizes = {
    small: {
      config: dialogConfigSmall,
      size: {
        width: '95vw',
        maxWidth: '400px',
        maxHeight: '300px',
      },
    },
    medium: {
      config: dialogConfigMedium,
      size: {
        width: '95vw',
        maxWidth: '1000px',
        maxHeight: '800px',
      },
    },
    large: {
      config: dialogConfigLarge,
      size: {
        width: '98vw',
        maxWidth: '2000px',
        height: '98vh',
        maxHeight: '2000px',
      },
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

    test.each([
      { disableClose: true, size: 'small' },
      { disableClose: true, size: 'large' },
      { disableClose: undefined, size: 'medium' },
    ])(
      'should call the matDialog open function with correct parameters',
      ({ disableClose, size }) => {
        const config = sizes[size].config
        service.openDialog(config, disableClose)
        disableClose = disableClose ? true : false
        expect(dialog.open).toHaveBeenCalledWith(GenericDialogComponent, {
          ...sizes[size].size,
          data: config,
          disableClose,
        })
      }
    )
  })
})
