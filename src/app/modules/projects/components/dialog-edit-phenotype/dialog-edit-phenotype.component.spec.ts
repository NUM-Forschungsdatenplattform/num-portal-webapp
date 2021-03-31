/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { PhenotypeUiModel } from 'src/app/shared/models/phenotype/phenotype-ui.model'
import { mockPhenotype1, mockPhenotype3 } from 'src/mocks/data-mocks/phenotypes.mock'
import { DialogEditPhenotypeComponent } from './dialog-edit-phenotype.component'

describe('DialogEditPhenotypeComponent', () => {
  let component: DialogEditPhenotypeComponent
  let fixture: ComponentFixture<DialogEditPhenotypeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditPhenotypeComponent],
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
    fixture = TestBed.createComponent(DialogEditPhenotypeComponent)
    component = fixture.componentInstance
  })

  describe('When the input phenotype contains parameters', () => {
    beforeEach(() => {
      component.dialogInput = new PhenotypeUiModel(mockPhenotype3)
      fixture.detectChanges()
      jest.restoreAllMocks()
    })

    it('should build the form inputs', () => {
      expect(component.formParameters.length).toEqual(2)
    })

    describe('and when the confirm handler is triggered', () => {
      it('should emit closing of the dialog with the input phenotype as payload when no parameters changed', () => {
        jest.spyOn(component.closeDialog, 'emit')
        component.handleDialogConfirm()

        expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
      })

      it('should emit closing of the dialog with the configured aql', () => {
        let resultHelper: PhenotypeUiModel
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

  describe('When the phenotype does not contain parameters and the confirm handler is triggered', () => {
    it('should emit closing of the dialog with the input phenotype as payload', () => {
      jest.spyOn(component.closeDialog, 'emit')
      component.dialogInput = new PhenotypeUiModel(mockPhenotype1)
      fixture.detectChanges()
      component.handleDialogConfirm()
      expect(component.closeDialog.emit).toHaveBeenCalledWith(component.dialogInput)
    })
  })

  it('should emit closing the dialog with false when cancel handler is triggered', () => {
    jest.spyOn(component.closeDialog, 'emit')
    component.dialogInput = new PhenotypeUiModel(mockPhenotype1)
    fixture.detectChanges()
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledWith(false)
  })
})
