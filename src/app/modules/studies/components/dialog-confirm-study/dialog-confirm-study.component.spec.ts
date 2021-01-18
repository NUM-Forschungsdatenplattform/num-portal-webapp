import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { DialogConfirmStudyComponent } from './dialog-confirm-study.component'

describe('DialogConfirmStudyComponent', () => {
  let component: DialogConfirmStudyComponent
  let fixture: ComponentFixture<DialogConfirmStudyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmStudyComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmStudyComponent)
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
