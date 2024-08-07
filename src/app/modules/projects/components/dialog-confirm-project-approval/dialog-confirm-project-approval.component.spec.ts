import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'

import { DialogConfirmProjectApprovalComponent } from './dialog-confirm-project-approval.component'

describe('DialogConfirmProjectApprovalComponent', () => {
  let component: DialogConfirmProjectApprovalComponent
  let fixture: ComponentFixture<DialogConfirmProjectApprovalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmProjectApprovalComponent, ButtonComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmProjectApprovalComponent)
    component = fixture.componentInstance
    component.form = new FormGroup({
      check: new FormControl(false, [Validators.requiredTrue]),
    })
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

  it('should disable the button if the checkbox is not checked', () => {
    component.form.patchValue({ check: false })
    fixture.detectChanges()

    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('#approval-button').querySelector('button')
    expect(button.disabled).toBeTruthy()
  })
})
