import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

import { DialogSaveProfileComponent } from './dialog-save-profile.component'

describe('DialogSaveProfileComponent', () => {
  let component: DialogSaveProfileComponent
  let fixture: ComponentFixture<DialogSaveProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSaveProfileComponent, ButtonComponent],
      imports: [MaterialModule, NoopAnimationsModule, TranslateModule.forRoot()],
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
