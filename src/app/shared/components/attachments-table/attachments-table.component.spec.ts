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
import { Directive, Pipe, PipeTransform } from '@angular/core'
import { HarnessLoader } from '@angular/cdk/testing'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCheckboxHarness } from '@angular/material/checkbox/testing'
import { MatSortModule } from '@angular/material/sort'
import {
  MatTableHarness,
  MatCellHarness,
  MatHeaderCellHarness,
} from '@angular/material/table/testing'
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { TranslateModule } from '@ngx-translate/core'
import { attachmentApiMocks } from '../../../../mocks/data-mocks/project-attachment.mock'
import { AttachmentsTableComponent } from './attachments-table.component'
import { MatButtonHarness } from '@angular/material/button/testing'
import { ButtonComponent } from '../button/button.component'
import { of } from 'rxjs'
import { AttachmentService } from 'src/app/core/services/attachment/attachment.service'

const attachmentUiMocks = attachmentApiMocks.map(
  (attachmentApiMock) => new ProjectAttachmentUiModel(attachmentApiMock)
)

describe('AttachmentsTableComponent', () => {
  let component: AttachmentsTableComponent
  let fixture: ComponentFixture<AttachmentsTableComponent>
  let harnessLoader: HarnessLoader

  @Directive({
    selector: '[numTooltipNecessary]',
  })
  class ToolTipNecessaryStubDirective {}

  @Pipe({
    name: 'localizedDate',
  })
  class MockLocalizedDatePipe implements PipeTransform {
    transform(value: number): number {
      return value
    }
  }

  const attachmentMockService = {
    downloadAttachment: jest.fn(),
  } as unknown as AttachmentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AttachmentsTableComponent,
        ButtonComponent,
        ToolTipNecessaryStubDirective,
        MockLocalizedDatePipe,
      ],
      imports: [
        CommonModule,
        MatCheckboxModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: AttachmentService,
          useValue: attachmentMockService,
        },
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(AttachmentsTableComponent)
    component = fixture.componentInstance
    harnessLoader = TestbedHarnessEnvironment.loader(fixture)
    fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when a list of attachments have been loaded', () => {
    beforeEach(() => {
      component.attachments = attachmentUiMocks
      fixture.detectChanges()
    })

    it('should show one row per attachment', async () => {
      const table = await harnessLoader.getHarness(MatTableHarness)
      const rows = await table.getRows()
      expect(rows.length).toEqual(attachmentUiMocks.length)
      rows.forEach(async (row, idx) => {
        const { name, description } = await row.getCellTextByColumnName()
        expect(name).toEqual(attachmentUiMocks[idx].name)
        expect(description).toEqual(attachmentUiMocks[idx].description)
      })
    })

    it('should also show select columns if view only mode is switched off', async () => {
      component.viewMode = false
      const table = await harnessLoader.getHarness(MatTableHarness)
      const columns = await table.getCellTextByColumnName()
      expect(Object.keys(columns)).toContain('select')
    })
  })

  describe('when selecting rows from table', () => {
    beforeEach(() => {
      component.attachments = attachmentUiMocks
      component.viewMode = false
      fixture.detectChanges()
    })

    it('should (de)select single rows using the checkbox', async () => {
      const firstSelect = await harnessLoader.getHarness(
        MatCellHarness.with({ columnName: 'select' })
      )
      const checkbox = await firstSelect.getHarness(MatCheckboxHarness)
      await checkbox.toggle()
      expect(component.selection.selected.length).toEqual(1)
      expect(component.selection.selected).toContain(attachmentUiMocks[0])
      await checkbox.toggle()
      expect(component.selection.selected).not.toContain(attachmentUiMocks[0])
    })

    it('should (de)select all rows if none has been selected before', async () => {
      const masterSelect = await harnessLoader.getHarness(
        MatHeaderCellHarness.with({ columnName: 'select' })
      )
      const checkbox = await masterSelect.getHarness(MatCheckboxHarness)
      await checkbox.toggle()
      expect(component.selection.selected.length).toEqual(attachmentUiMocks.length)
      expect(component.isAllSelected()).toEqual(true)
      await checkbox.toggle()
      expect(component.selection.selected.length).toEqual(0)
      expect(component.isAllSelected()).toEqual(false)
    })

    it('should select all rows if only partial rows have been selected before', async () => {
      const selects = await harnessLoader.getAllHarnesses(
        MatCellHarness.with({ columnName: 'select' })
      )
      const firstCheckbox = await selects[0].getHarness(MatCheckboxHarness)
      const thirdCheckbox = await selects[2].getHarness(MatCheckboxHarness)
      await Promise.all([firstCheckbox.toggle(), thirdCheckbox.toggle()])
      expect(component.selection.selected.length).toEqual(2)
      const masterSelect = await harnessLoader.getHarness(
        MatHeaderCellHarness.with({ columnName: 'select' })
      )
      const masterToggleCheckbox = await masterSelect.getHarness(MatCheckboxHarness)
      await masterToggleCheckbox.toggle()
      expect(component.selection.selected.length).toEqual(attachmentUiMocks.length)
    })
  })

  describe('Download button', () => {
    let downloadButton: MatButtonHarness
    let selectCells: MatCellHarness[]

    beforeEach(async () => {
      component.attachments = attachmentUiMocks
      component.viewMode = false
      downloadButton = await harnessLoader.getHarness(
        MatButtonHarness.with({ text: 'PROJECT.ATTACHMENT.DOWNLOAD' })
      )
      selectCells = await harnessLoader.getAllHarnesses(
        MatCellHarness.with({ columnName: 'select' })
      )
    })
    it('should be disabled if no attachment have been selected', async () => {
      expect(await downloadButton.isDisabled()).toBeTruthy()
    })

    it('should disable the button if last row has been unchecked', async () => {
      await (await selectCells[0].getHarness(MatCheckboxHarness)).check()
      expect(await downloadButton.isDisabled()).toBeFalsy()
      await (await selectCells[0].getHarness(MatCheckboxHarness)).uncheck()
      expect(await downloadButton.isDisabled()).toBeTruthy()
    })

    it('should be enabled if one or more attachments have been selected', async () => {
      await (await selectCells[0].getHarness(MatCheckboxHarness)).check()
      expect(await downloadButton.isDisabled()).toBeFalsy()
      await (await selectCells[1].getHarness(MatCheckboxHarness)).check()
      expect(await downloadButton.isDisabled()).toBeFalsy()
    })

    it('should trigger download for all selected rows', async () => {
      jest
        .spyOn(attachmentMockService, 'downloadAttachment')
        .mockImplementation((id: number) =>
          of(new Blob([`This is test file ${id} content`], { type: 'application/pdf' }))
        )

      await (await selectCells[0].getHarness(MatCheckboxHarness)).check()
      await (await selectCells[1].getHarness(MatCheckboxHarness)).check()
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
    })

    it('should not trigger a download if there were no attachments selected', () => {
      jest.spyOn(attachmentMockService, 'downloadAttachment')
      component.handleDownloadClick()
      expect(attachmentMockService.downloadAttachment).not.toHaveBeenCalled()
    })

    it('should handle selection is not defined as no selection has been made', () => {
      jest.spyOn(attachmentMockService, 'downloadAttachment')
      component.selection = undefined
      component.handleDownloadClick()
      expect(attachmentMockService.downloadAttachment).not.toHaveBeenCalled()
      expect(component.isDownloadButtonDisabled).toBeTruthy()
    })
  })
})
