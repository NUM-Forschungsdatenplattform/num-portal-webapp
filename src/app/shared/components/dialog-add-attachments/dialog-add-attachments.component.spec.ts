/**
 * Copyright 2024 Vitagroup AG
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
import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { By } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { AttachmentUploadStatus } from '../../models/attachment/attachment-upload-status.enum'
import { DialogConfig } from '../../models/dialog/dialog-config.interface'
import { DialogSize } from '../../models/dialog/dialog-size.enum'

import { DialogAddAttachmentsComponent, UploadDialogData } from './dialog-add-attachments.component'

describe('DialogAddAttachmentsComponent', () => {
  let component: DialogAddAttachmentsComponent
  let fixture: ComponentFixture<DialogAddAttachmentsComponent>

  const dialogStubData = {
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Save',
    dialogContentComponent: DialogAddAttachmentsComponent,
    dialogContentPayload: {
      projectId: 123,
    } as UploadDialogData,
    dialogSize: DialogSize.Medium,
    title: 'Add attachment',
  } as DialogConfig

  const uploadProgressSubject$ = new BehaviorSubject<AttachmentUploadStatus>(
    AttachmentUploadStatus.IDLE
  )

  const attachmentMockService = {
    uploadAttachment: jest.fn(),
    uploadProgressObservable$: uploadProgressSubject$.asObservable(),
  } as unknown as AttachmentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddAttachmentsComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogStubData,
        },
        {
          provide: AttachmentService,
          useValue: attachmentMockService,
        },
      ],
      imports: [
        CommonModule,
        FontAwesomeTestingModule,
        MatInputModule,
        MatProgressBarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogAddAttachmentsComponent)
    component = fixture.componentInstance

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should patch the file name value on file selection', () => {
    const fileInput = fixture.debugElement.query(By.css('input[type="file"]'))
    const event = {
      target: {
        files: {
          item: () => new File(['test content'], 'my-test-file.pdf'),
        } as unknown as FileList,
      } as unknown as HTMLInputElement,
    } as unknown as InputEvent
    fileInput.triggerEventHandler('change', event)
    fixture.detectChanges()
    expect(component.formGroup.get('fileName').value).toEqual('my-test-file.pdf')
  })

  it('should reset the form on dialog cancel', () => {
    component.closeDialog.emit = jest.fn()
    jest.spyOn(component.closeDialog, 'emit')

    component.formGroup.patchValue({
      description: 'my test description',
      fileName: 'my-file-name.pdf',
    })

    component.handleDialogCancel()
    expect(component.formGroup.getRawValue()).toEqual({ description: '', fileName: '' })
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  describe('when confirming the dialog', () => {
    beforeEach(() => {
      component.closeDialog.emit = jest.fn()
      jest.spyOn(component.closeDialog, 'emit')
      component.dialogInput = { projectId: 123 }
    })

    it('should not do anything on submit if file name has not been provided', () => {
      component.formGroup.patchValue({
        description: 'my test description',
        fileName: '',
      })

      component.handleDialogConfirm()
      expect(component.closeDialog.emit).not.toHaveBeenCalled()
    })

    it('should call the attachment upload service', () => {
      const file = new File(['content of success file 1'], 'test-success-1.pdf')
      component.formGroup.patchValue({
        description: 'test successful form values',
        fileName: 'test-success-1.pdf',
      })
      component.file = file

      jest.spyOn(attachmentMockService, 'uploadAttachment').mockImplementation(() => of(true))

      component.handleDialogConfirm()

      expect(attachmentMockService.uploadAttachment).toHaveBeenCalledWith(
        123,
        file,
        'test successful form values'
      )
    })

    it('should reset the form and emit file data to parent component', () => {
      const file = new File(['content of success file 2'], 'test-success-2.pdf')
      component.formGroup.patchValue({
        description: 'test successful form values',
        fileName: 'test-success-2.pdf',
      })
      component.file = file

      jest.spyOn(attachmentMockService, 'uploadAttachment').mockImplementation(() => of(true))

      component.handleDialogConfirm()

      expect(component.formGroup.getRawValue()).toEqual({ description: '', fileName: '' })
      expect(component.closeDialog.emit).toHaveBeenCalledWith({
        description: 'test successful form values',
        file: file,
      })
    })
  })
})
