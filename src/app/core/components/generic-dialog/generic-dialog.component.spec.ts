import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { DialogSize } from 'src/app/shared/models/dialog/dialog-size.enum'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'
import { GenericDialogComponent } from './generic-dialog.component'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

describe('GenericDialogComponent', () => {
  let component: GenericDialogComponent
  let fixture: ComponentFixture<GenericDialogComponent>

  const closeEmitter = new EventEmitter()
  const confirmHandler = jest.fn()
  const cancelHandler = jest.fn()
  @Component({ selector: 'num-test-component', template: '' })
  class StubComponent {
    @Output() closeDialog = closeEmitter
    @Input() handleDialogConfirm = confirmHandler
    @Input() handleDialogCancel = cancelHandler
  }

  const dialogConfig: DialogConfig = {
    title: 'Test',
    dialogSize: DialogSize.Medium,
    dialogContentComponent: StubComponent,
    dialogContentPayload: {
      test: 'test',
    },
  }

  const matDialogRef = {
    close: () => {},
  } as MatDialogRef<GenericDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericDialogComponent, StubComponent, ButtonComponent],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        ChangeDetectorRef,
        { provide: MAT_DIALOG_DATA, useValue: dialogConfig },
        { provide: MatDialogRef, useValue: matDialogRef },
      ],
    })
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [StubComponent],
      },
    })
  })

  beforeEach(() => {
    jest.spyOn(matDialogRef, 'close')
    fixture = TestBed.createComponent(GenericDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should create the dynamic content-component', () => {
    expect(component.componentRef).toBeTruthy()
  })

  it('should set the contentPayload to the dynamic content-component', () => {
    expect(component.componentRef.instance.dialogInput).toEqual(dialogConfig.dialogContentPayload)
  })

  it('it should close the dialog with the provided payload when the child emmits a closeEvent', () => {
    const valueToEmit = 'Test'
    closeEmitter.emit(valueToEmit)

    expect(matDialogRef.close).toHaveBeenCalledWith(valueToEmit)
  })

  it('should handle the confirm attempt in the child component', () => {
    component.handleDialogConfirm()

    expect(confirmHandler).toHaveBeenCalledTimes(1)
  })

  it('should handle the cancel attempt in the child component', () => {
    component.handleDialogCancel()

    expect(cancelHandler).toHaveBeenCalledTimes(1)
  })

  it('should close the dialog with undefined on a close attempt', () => {
    component.handleDialogClose()

    expect(matDialogRef.close).toHaveBeenCalledWith(undefined)
  })
})
