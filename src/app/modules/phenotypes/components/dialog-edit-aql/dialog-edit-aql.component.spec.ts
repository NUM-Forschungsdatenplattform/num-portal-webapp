import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { AqlUiModel } from 'src/app/shared/models/aql/aql-ui.model'
import { IAqlApi } from 'src/app/shared/models/aql/aql.interface'
import { mockAql1, mockAql3 } from 'src/mocks/data-mocks/aqls.mock'

import { DialogEditAqlComponent } from './dialog-edit-aql.component'

describe('DialogEditAqlComponent', () => {
  let component: DialogEditAqlComponent
  let fixture: ComponentFixture<DialogEditAqlComponent>
  const inputApiAql: IAqlApi = {
    id: 1,
    name: 'Test',
    query: '',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditAqlComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditAqlComponent)
    component = fixture.componentInstance
  })

  describe('When the input aql contains parameters', () => {
    beforeEach(() => {
      component.dialogInput = new AqlUiModel(mockAql3)
      fixture.detectChanges()
      jest.restoreAllMocks()
    })
    it('should provide the highlighted query string with markup', () => {
      expect(component.queryHighlighted).toContain('<span class="mark">')
    })
    it('should build the form inputs', () => {
      expect(component.formParameters.length).toEqual(2)
    })

    describe('and when the confirm handler is triggered', () => {
      it('should emit closing of the dialog with the input aql as payload when no parameters changed', () => {
        jest.spyOn(component.closeDialog, 'emit')
        component.handleDialogConfirm()

        expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
      })

      it('should emit closing of the dialog with the configured aql', () => {
        let resultHelper: AqlUiModel
        jest
          .spyOn(component.closeDialog, 'emit')
          .mockImplementation((value) => (resultHelper = value))
        component.formParameters.value.forEach((value) => {
          value.parameter = 'is now set'
        })
        component.handleDialogConfirm()
        expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
        expect(resultHelper.areParameterConfigured).toEqual(true)
      })
    })
  })

  describe('When the aql does not contain parameters and the confirm handler is triggered', () => {
    it('should emit closing of the dialog with the input aql as payload', () => {
      jest.spyOn(component.closeDialog, 'emit')
      component.dialogInput = new AqlUiModel(mockAql1)
      fixture.detectChanges()
      component.handleDialogConfirm()
      expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
    })
  })

  it('should emit closing the dialog with false when cancel handler is triggered', () => {
    jest.spyOn(component.closeDialog, 'emit')
    component.dialogInput = new AqlUiModel(mockAql1)
    fixture.detectChanges()
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(false)
  })
})
