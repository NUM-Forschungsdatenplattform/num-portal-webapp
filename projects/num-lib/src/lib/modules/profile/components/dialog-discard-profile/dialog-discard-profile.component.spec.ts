import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'

import { DialogDiscardProfileComponent } from './dialog-discard-profile.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { ButtonComponent } from 'projects/num-lib/src/lib/shared/components/button/button.component'

describe('DialogDiscardProfileComponent', () => {
  let component: DialogDiscardProfileComponent
  let fixture: ComponentFixture<DialogDiscardProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDiscardProfileComponent, ButtonComponent],
      imports: [MaterialModule, BrowserAnimationsModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDiscardProfileComponent)
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
