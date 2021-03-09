import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

import { DialogEditWelcomeCardComponent } from './dialog-edit-welcome-card.component'

describe('DialogEditWelcomeCardComponent', () => {
  let component: DialogEditWelcomeCardComponent
  let fixture: ComponentFixture<DialogEditWelcomeCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditWelcomeCardComponent, ButtonComponent],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditWelcomeCardComponent)
    component = fixture.componentInstance
    component.dialogInput = new FormGroup({
      titleEnglish: new FormControl(),
      titleGerman: new FormControl(),
      bodyTextEnglish: new FormControl(),
      bodyTextGerman: new FormControl(),
      url: new FormControl(),
      imageId: new FormControl(),
    })

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit with undefined on cancel', () => {
    jest.spyOn(component.closeDialog, 'emit')
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledWith()
  })

  it('should emit with the modified form on confirm', () => {
    jest.spyOn(component.closeDialog, 'emit')
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.form)
  })
})
