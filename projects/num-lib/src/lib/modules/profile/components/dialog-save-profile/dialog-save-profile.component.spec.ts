import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { DialogSaveProfileComponent } from './dialog-save-profile.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { ButtonComponent } from '../../../../shared/components/button/button.component'

describe('DialogSaveProfileComponent', () => {
  let component: DialogSaveProfileComponent
  let fixture: ComponentFixture<DialogSaveProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSaveProfileComponent, ButtonComponent],
      imports: [MaterialModule, BrowserAnimationsModule, ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaveProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(component.closeDialog, 'emit')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the close event on dialog confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(true)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(false)
  })
})
