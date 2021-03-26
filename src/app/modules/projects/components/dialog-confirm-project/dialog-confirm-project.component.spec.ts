import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'

import { DialogConfirmProjectComponent } from './dialog-confirm-project.component'

describe('DialogConfirmStudyComponent', () => {
  let component: DialogConfirmProjectComponent
  let fixture: ComponentFixture<DialogConfirmProjectComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmProjectComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmProjectComponent)
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
