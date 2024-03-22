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
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { CommonModule } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatButtonModule } from '@angular/material/button'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MatButtonHarness } from '@angular/material/button/testing'
import { of, Subject, throwError } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'
import { ToastMessageType } from '../../models/toast-message-type.enum'
import { AttachmentsTableActionsComponent } from './attachments-table-actions.component'
import { ButtonComponent } from '../button/button.component'
import {
  attachmentApiMock1,
  attachmentApiMock2,
  attachmentApiMock3,
  attachmentApiMocks,
} from '../../../../mocks/data-mocks/project-attachment.mock'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
jest.mock('src/app/core/utils/download-file.utils.ts', () => ({
  downloadPdf: jest.fn(),
}))
import { downloadPdf } from 'src/app/core/utils/download-file.utils'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ProjectUiModel } from '../../models/project/project-ui.model'
import { mockProject1 } from 'src/mocks/data-mocks/project.mock'
import { DialogConfig } from '../../models/dialog/dialog-config.interface'
import {
  ConfirmationDialogInput,
  DialogConfirmationComponent,
} from '../dialog-confirmation/dialog-confirmation.component'
import { DialogSize } from '../../models/dialog/dialog-size.enum'
import {
  DialogAddAttachmentsComponent,
  UploadDialogData,
} from '../dialog-add-attachments/dialog-add-attachments.component'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { MatDialogRef } from '@angular/material/dialog'
import { GenericDialogComponent } from 'src/app/core/components/generic-dialog/generic-dialog.component'
import { ProjectStatus } from '../../models/project/project-status.enum'

const attachmentUiMocks = attachmentApiMocks.map(
  (attachmentApiMock) => new ProjectAttachmentUiModel(attachmentApiMock)
)

describe('AttachmentTableActionsComponent', () => {
  let component: AttachmentsTableActionsComponent
  let hostComponent: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>
  let harnessLoader: HarnessLoader

  @Component({
    selector: 'num-test-host-component',
    template: `<div>
      <num-attachments-table-actions
        [attachments]="attachments"
        [project]="project"
        [selected]="selected"
        [showDownloadButton]="showDownloadButton"
      ></num-attachments-table-actions>
    </div>`,
  })
  class TestHostComponent {
    attachments: ProjectAttachmentUiModel[] = []
    project: ProjectUiModel = new ProjectUiModel({
      ...mockProject1,
      attachments: [attachmentApiMock1, attachmentApiMock2, attachmentApiMock3],
    })
    selected: ProjectAttachmentUiModel[] = []
    showDownloadButton: boolean = false
    showUploadButton: boolean = false

    @ViewChild(AttachmentsTableActionsComponent, { static: true })
    public attachmentsTableActionsComponent: AttachmentsTableActionsComponent
  }

  const attachmentMockService = {
    downloadAttachment: jest.fn(),
    loadAttachments: jest.fn(),
  } as unknown as AttachmentService

  const dialogMockService = {
    openDialog: jest.fn(),
  } as unknown as DialogService

  const projectMockService = {
    markAttachmentsForDelete: jest.fn(),
  } as unknown as ProjectService

  const toastMessageMockService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsTableActionsComponent, ButtonComponent, TestHostComponent],
      imports: [CommonModule, FontAwesomeTestingModule, MatButtonModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AttachmentService,
          useValue: attachmentMockService,
        },
        {
          provide: DialogService,
          useValue: dialogMockService,
        },
        {
          provide: ProjectService,
          useValue: projectMockService,
        },
        {
          provide: ToastMessageService,
          useValue: toastMessageMockService,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    hostComponent = fixture.componentInstance
    component = hostComponent.attachmentsTableActionsComponent
    harnessLoader = TestbedHarnessEnvironment.loader(fixture)
    fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Download button', () => {
    let downloadButton: MatButtonHarness

    beforeEach(async () => {
      component.attachments = attachmentUiMocks
      component.showDownloadButton = true
      fixture.detectChanges()
      downloadButton = await harnessLoader.getHarness(
        MatButtonHarness.with({ text: 'PROJECT.ATTACHMENT.DOWNLOAD' })
      )
    })
    it('should be disabled if no attachment have been selected', async () => {
      expect(await downloadButton.isDisabled()).toBeTruthy()
    })

    it('should disable the button if last row has been unchecked', async () => {
      hostComponent.selected = [attachmentUiMocks[1]]
      fixture.detectChanges()
      expect(await downloadButton.isDisabled()).toBeFalsy()
      hostComponent.selected = []
      fixture.detectChanges()
      expect(await downloadButton.isDisabled()).toBeTruthy()
    })

    it('should be enabled if one or more attachments have been selected', async () => {
      hostComponent.selected = [attachmentUiMocks[0]]
      fixture.detectChanges()
      expect(await downloadButton.isDisabled()).toBeFalsy()
      hostComponent.selected = [attachmentUiMocks[0], attachmentUiMocks[1]]
      fixture.detectChanges()
      expect(await downloadButton.isDisabled()).toBeFalsy()
    })

    it('should trigger download for all selected rows', async () => {
      jest
        .spyOn(attachmentMockService, 'downloadAttachment')
        .mockImplementation((id: number) =>
          of(new Blob([`This is test file ${id} content`], { type: 'application/pdf' }))
        )

      hostComponent.selected = [attachmentUiMocks[0], attachmentUiMocks[1]]
      fixture.detectChanges()
      await downloadButton.click()
      expect(attachmentMockService.downloadAttachment).toHaveBeenCalledTimes(2)
      expect(attachmentMockService.downloadAttachment).toHaveBeenNthCalledWith(
        1,
        attachmentUiMocks[0].id
      )
      expect(attachmentMockService.downloadAttachment).toHaveBeenNthCalledWith(
        2,
        attachmentUiMocks[1].id
      )
      expect(downloadPdf).toHaveBeenCalledTimes(2)
      expect(downloadPdf).toHaveBeenNthCalledWith(
        1,
        attachmentUiMocks[0].name,
        new Blob([`This is test file ${attachmentUiMocks[0].id} content`], {
          type: 'application/pdf',
        })
      )
      expect(downloadPdf).toHaveBeenNthCalledWith(
        2,
        attachmentUiMocks[1].name,
        new Blob([`This is test file ${attachmentUiMocks[1].id} content`], {
          type: 'application/pdf',
        })
      )
    })

    it('should not trigger a download if there were no attachments selected', () => {
      jest.spyOn(attachmentMockService, 'downloadAttachment')
      component.handleDownloadClick()
      expect(attachmentMockService.downloadAttachment).not.toHaveBeenCalled()
    })

    it('should handle selection is not defined as no selection has been made', () => {
      jest.spyOn(attachmentMockService, 'downloadAttachment')
      hostComponent.selected = undefined
      fixture.detectChanges()
      component.handleDownloadClick()
      expect(attachmentMockService.downloadAttachment).not.toHaveBeenCalled()
      expect(component.isDownloadButtonDisabled).toBeTruthy()
    })

    test.each([
      [404, 'PROJECT.ATTACHMENT.ERROR_FILE_NOT_FOUND'],
      [503, 'PROJECT.ATTACHMENT.ERROR_TRY_AGAIN'],
      [500, 'PROJECT.ATTACHMENT.ERROR_OTHER'],
    ])('should show the correct error toast for %p responses', async (status, expectedMessage) => {
      jest.spyOn(attachmentMockService, 'downloadAttachment').mockImplementation(() =>
        throwError(
          () =>
            new HttpErrorResponse({
              error: `Error with status ${status} occurred.`,
              status: status,
            })
        )
      )
      hostComponent.selected = [attachmentUiMocks[0]]
      fixture.detectChanges()
      await downloadButton.click()
      expect(toastMessageMockService.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Error,
        message: expectedMessage,
      })
    })

    it('should show generic error toast for all unexpected errors', async () => {
      jest
        .spyOn(attachmentMockService, 'downloadAttachment')
        .mockImplementation(() => throwError(() => new Error('Something unexpected happened.')))

      hostComponent.selected = [attachmentUiMocks[0]]
      fixture.detectChanges()
      await downloadButton.click()

      expect(toastMessageMockService.openToast).toHaveBeenCalledWith({
        type: ToastMessageType.Error,
        message: 'PROJECT.ATTACHMENT.ERROR_OTHER',
      })
    })
  })

  describe('Upload button', () => {
    let uploadButton: MatButtonHarness
    const dialogClosedSubject$ = new Subject<{ description?: string; file: File } | void>()

    beforeEach(async () => {
      jest.spyOn(dialogMockService, 'openDialog').mockImplementation(
        () =>
          ({
            afterClosed: () => dialogClosedSubject$.asObservable(),
          }) as unknown as MatDialogRef<GenericDialogComponent>
      )

      component.showUploadButton = true
      fixture.detectChanges()
      uploadButton = await harnessLoader.getHarness(
        MatButtonHarness.with({ text: 'PROJECT.ATTACHMENT.ADD' })
      )
    })

    it('should show the download button in enabled mode', async () => {
      expect(await uploadButton.isDisabled()).toBeFalsy()
    })

    it('should open the dialog to upload an attachment', async () => {
      await uploadButton.click()
      expect(dialogMockService.openDialog).toHaveBeenCalledWith({
        dialogContentComponent: DialogAddAttachmentsComponent,
        dialogSize: DialogSize.Medium,
        title: 'PROJECT.ATTACHMENT.ADD_DIALOG_TITLE',
        cancelButtonText: 'BUTTON.CANCEL',
        confirmButtonText: 'PROJECT.ATTACHMENT.UPLOAD',
        dialogContentPayload: {
          projectId: 1,
        } as UploadDialogData,
      } as DialogConfig)
    })

    it('should reload all attachments once save has finished', async () => {
      jest.spyOn(attachmentMockService, 'loadAttachments')
      await uploadButton.click()
      dialogClosedSubject$.next({ file: new File(['Test-Content'], 'test-uploaded.pdf') })
      expect(attachmentMockService.loadAttachments).toHaveBeenCalledTimes(1)
    })
  })

  describe('Delete button', () => {
    let deleteButton: MatButtonHarness
    const onDialogCloseSubject$ = new Subject<boolean>()

    beforeEach(async () => {
      jest.spyOn(dialogMockService, 'openDialog').mockImplementation(
        () =>
          ({
            afterClosed: () => onDialogCloseSubject$.asObservable(),
          }) as unknown as MatDialogRef<GenericDialogComponent>
      )
      hostComponent.selected = [attachmentUiMocks[1], attachmentUiMocks[2]]
      deleteButton = await harnessLoader.getHarness(
        MatButtonHarness.with({ text: 'PROJECT.ATTACHMENT.REMOVE' })
      )
    })

    it('should enable and disable when no items have been selected', async () => {
      expect(await deleteButton.isDisabled()).toBeFalsy()
      hostComponent.selected = []
      expect(await deleteButton.isDisabled()).toBeTruthy()
    })

    test.each<{ status: ProjectStatus; disabled: boolean }>([
      { disabled: true, status: ProjectStatus.Approved },
      { disabled: true, status: ProjectStatus.Archived },
      { disabled: false, status: ProjectStatus.ChangeRequest },
      { disabled: true, status: ProjectStatus.Closed },
      { disabled: true, status: ProjectStatus.Denied },
      { disabled: false, status: ProjectStatus.Draft },
      { disabled: true, status: ProjectStatus.Pending },
      { disabled: true, status: ProjectStatus.Published },
      { disabled: false, status: ProjectStatus.Reviewing },
      { disabled: true, status: ProjectStatus.ToBeDeleted },
    ])(
      'should set disabled to "$disabled" for project status "$status"',
      ({ status, disabled }) => {
        hostComponent.project = new ProjectUiModel({
          ...mockProject1,
          attachments: [attachmentApiMock1, attachmentApiMock2, attachmentApiMock3],
          status,
        })
        fixture.detectChanges()
        expect(component.isDeleteButtonDisabled).toEqual(disabled)
      }
    )

    it('should open the confirmation dialog if clicked', async () => {
      await deleteButton.click()
      expect(dialogMockService.openDialog).toHaveBeenCalledWith({
        dialogContentComponent: DialogConfirmationComponent,
        dialogSize: DialogSize.Medium,
        title: 'PROJECT.ATTACHMENT.CONFIRM_REMOVE_DIALOG_TITLE',
        cancelButtonText: 'BUTTON.CANCEL',
        confirmButtonText: 'PROJECT.ATTACHMENT.REMOVE',
        dialogContentPayload: {
          useHtml: true,
          text: 'PROJECT.ATTACHMENT.CONFIRM_REMOVE_DIALOG_CONTENT',
        } as ConfirmationDialogInput,
      } as DialogConfig)
    })

    it('should add attachments to delete after dialog has been closed', async () => {
      jest
        .spyOn(projectMockService, 'markAttachmentsForDelete')
        .mockImplementation(() => of(undefined))
      await deleteButton.click()
      onDialogCloseSubject$.next(true)
      expect(projectMockService.markAttachmentsForDelete).toHaveBeenCalledWith([
        attachmentUiMocks[1],
        attachmentUiMocks[2],
      ])
    })
  })
})
