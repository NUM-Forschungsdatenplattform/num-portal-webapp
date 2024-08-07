import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component, Directive, Input, Pipe, PipeTransform, SimpleChange } from '@angular/core'
import { HarnessLoader } from '@angular/cdk/testing'
import { MatCheckboxHarness } from '@angular/material/checkbox/testing'
import {
  MatTableHarness,
  MatCellHarness,
  MatHeaderCellHarness,
  MatRowHarness,
} from '@angular/material/table/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { TranslateModule } from '@ngx-translate/core'
import { attachmentApiMocks } from '../../../../mocks/data-mocks/project-attachment.mock'
import { AttachmentsTableComponent } from './attachments-table.component'
import { MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common'
import { MatSortModule } from '@angular/material/sort'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { ProjectUiModel } from '../../models/project/project-ui.model'
import { mockProject12 } from 'src/mocks/data-mocks/project.mock'
import { ProjectService } from 'src/app/core/services/project/project.service'
import { BehaviorSubject } from 'rxjs'

const attachmentUiMocks = attachmentApiMocks.map(
  (attachmentApiMock) => new ProjectAttachmentUiModel(attachmentApiMock)
)

describe('AttachmentsTableComponent', () => {
  let component: AttachmentsTableComponent
  let fixture: ComponentFixture<AttachmentsTableComponent>
  let harnessLoader: HarnessLoader

  @Component({
    selector: 'num-attachments-table-actions',
    template: '',
  })
  class AttachmentsTableActionsStubComponent {
    @Input() attachments: ProjectAttachmentUiModel[]
    @Input() project: ProjectUiModel
    @Input() selected?: ProjectAttachmentUiModel[]
    @Input() showDownloadButton: boolean
    @Input() showUploadButton: boolean
  }

  @Directive({
    selector: '[numTooltipNecessary]',
  })
  class ToolTipNecessaryStubDirective {}

  @Pipe({
    name: 'localizedDate',
  })
  class LocalizedDateStubPipe implements PipeTransform {
    transform(value: number): number {
      return value
    }
  }

  const attachmentsForRemovalSubject$ = new BehaviorSubject<ProjectAttachmentUiModel[]>([])
  const projectMockService = {
    attachmentsForRemovalObservable$: attachmentsForRemovalSubject$.asObservable(),
  } as unknown as ProjectService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AttachmentsTableComponent,
        AttachmentsTableActionsStubComponent,
        LocalizedDateStubPipe,
        ToolTipNecessaryStubDirective,
      ],
      imports: [
        CommonModule,
        MatCheckboxModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ProjectService,
          useValue: projectMockService,
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
      component.project = new ProjectUiModel({ ...mockProject12, attachments: attachmentApiMocks })
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
      component.ngOnChanges({
        showSelectColumn: new SimpleChange(false, true, false),
      })
      const table = await harnessLoader.getHarness(MatTableHarness)
      const columns = await table.getCellTextByColumnName()
      expect(Object.keys(columns)).toContain('select')
    })
  })

  describe('when selecting rows from table', () => {
    beforeEach(() => {
      component.attachments = attachmentUiMocks
      component.ngOnChanges({
        showSelectColumn: new SimpleChange(false, true, false),
      })
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

  describe('when attachments have been marked for removal', () => {
    let rows: MatRowHarness[]
    beforeEach(async () => {
      component.attachments = attachmentUiMocks
      attachmentsForRemovalSubject$.next([attachmentUiMocks[1]])
      rows = await harnessLoader.getAllHarnesses(MatRowHarness)
    })

    it('should strike through the text for marked entries', async () => {
      expect(await (await rows[0].host()).hasClass('remove')).toBeFalsy()
      expect(await (await rows[1].host()).hasClass('remove')).toBeTruthy()
    })
  })
})
