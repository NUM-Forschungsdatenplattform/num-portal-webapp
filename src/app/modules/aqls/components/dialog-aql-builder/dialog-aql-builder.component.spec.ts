import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogAqlBuilderComponent } from './dialog-aql-builder.component'

describe('DialogAqlBuilderComponent', () => {
  let component: DialogAqlBuilderComponent
  let fixture: ComponentFixture<DialogAqlBuilderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAqlBuilderComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAqlBuilderComponent)
    component = fixture.componentInstance
    jest.spyOn(component.closeDialog, 'emit')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the close event with current dialogInput on confirmation', () => {
    component.dialogInput = 'test'
    fixture.detectChanges()
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })
})
