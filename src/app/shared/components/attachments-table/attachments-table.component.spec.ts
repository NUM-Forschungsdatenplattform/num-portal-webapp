import { HarnessLoader } from '@angular/cdk/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatTableHarness } from '@angular/material/table/testing'
import { AttachmentsTableComponent } from './attachments-table.component'
import { attachmentApiMocks } from '../../../../mocks/data-mocks/project-attachment.mock'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTooltipModule } from '@angular/material/tooltip'
import { Directive, Pipe, PipeTransform } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AttachmentsTableComponent,
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
    }).compileComponents()
    fixture = TestBed.createComponent(AttachmentsTableComponent)
    component = fixture.componentInstance
    harnessLoader = TestbedHarnessEnvironment.loader(fixture)
    fixture.detectChanges()
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
})
