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
import { mockAql3 } from 'src/mocks/data-mocks/aqls.mock'
import { DialogAqlInfoComponent } from './dialog-aql-info.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { AqlUiModel } from '../../../../shared/models/aql/aql-ui.model'

describe('DialogAqlInfoComponent', () => {
  let component: DialogAqlInfoComponent
  let fixture: ComponentFixture<DialogAqlInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAqlInfoComponent],
      imports: [MaterialModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAqlInfoComponent)
    component = fixture.componentInstance
    component.dialogInput = new AqlUiModel(mockAql3)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the input aql contains parameters', () => {
    beforeEach(() => {
      component.dialogInput = new AqlUiModel(mockAql3)
      fixture.detectChanges()
    })
    it('should provide the highlighted query string with markup', () => {
      expect(component.queryHighlighted).toContain('<span class="mark--name">')
      expect(component.queryHighlighted).toContain('<span class="mark--operator">')
    })
  })

  describe('When the confirm handler is triggered', () => {
    it('should emit closing of the dialog', () => {
      jest.spyOn(component.closeDialog, 'emit')
      component.handleDialogConfirm()
      expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
    })
  })

  describe('When the cancle handler is triggered', () => {
    it('should emit closing of the dialog', () => {
      jest.spyOn(component.closeDialog, 'emit')
      component.handleDialogCancel()
      expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
    })
  })
})
