import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogConfirmationComponent } from './dialog-confirmation.component'
import { TranslateModule } from '@ngx-translate/core'
import { By } from '@angular/platform-browser'

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
    component.dialogInput = 'test-text'
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

  it('should use the innerHtml attribute if the input is not a string', () => {
    component.dialogInput = { useHtml: true, text: 'test-text' }
    fixture.detectChanges()
    const paragraph = fixture.debugElement.query(By.css('p'))
    expect((paragraph.nativeElement as HTMLParagraphElement).innerHTML).toEqual('test-text')
  })
})
