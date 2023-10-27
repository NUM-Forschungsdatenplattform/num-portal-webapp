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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'

import { DialogEditWelcomeCardComponent } from './dialog-edit-welcome-card.component'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { ButtonComponent } from '../../../../shared/components/button/button.component'

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
        FontAwesomeTestingModule,
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
