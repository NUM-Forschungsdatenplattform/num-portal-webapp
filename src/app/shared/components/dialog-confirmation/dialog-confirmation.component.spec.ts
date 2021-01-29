import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogConfirmationComponent } from './dialog-confirmation.component'
import { TranslateModule } from '@ngx-translate/core'

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent
  let fixture: ComponentFixture<DialogConfirmationComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmationComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmationComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the true on the close-emitter, when the user confirms', () => {
    jest.spyOn(component.closeDialog, 'emit')
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(true)
  })

  it('should emit the false on the close-emitter, when the user cancels', () => {
    jest.spyOn(component.closeDialog, 'emit')
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(false)
  })
})
