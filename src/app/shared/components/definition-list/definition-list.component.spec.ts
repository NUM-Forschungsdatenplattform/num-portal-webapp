import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DefinitionListComponent } from './definition-list.component'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { IDefinitionList } from '../../models/definition-list.interface'
import { DefinitionType } from '../../models/definition-type.enum'
import { By } from '@angular/platform-browser'
import { Component, Input } from '@angular/core'
import { ProjectAttachmentUiModel } from '../../models/project/project-attachment-ui.model'
import { ProjectUiModel } from '../../models/project/project-ui.model'

describe('DifinationListComponent', () => {
  let component: DefinitionListComponent
  let fixture: ComponentFixture<DefinitionListComponent>

  @Component({
    selector: 'num-attachments-table',
    template: '',
  })
  class AttachmentsTableStubComponent {
    @Input() attachments: ProjectAttachmentUiModel[] = []
    @Input() project: ProjectUiModel
    @Input() showSelectColumn: boolean
    @Input() isInPreview: boolean
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentsTableStubComponent, DefinitionListComponent],
      imports: [TranslateModule.forRoot(), FontAwesomeTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show text yes and no to boolean elements', () => {
    const definitionList: IDefinitionList[] = [
      {
        description: true,
        title: 'Test true',
        type: DefinitionType.Boolean,
      },
      {
        description: false,
        title: 'Test false',
        type: DefinitionType.Boolean,
      },
    ]

    component.dataSource = definitionList
    fixture.detectChanges()

    const icons = fixture.debugElement.queryAll(
      By.css(`[data-test="definition_list__boolean__element__text"]`)
    )

    expect(icons).toHaveLength(2)
    expect((icons[0].nativeElement as HTMLParagraphElement).innerHTML.trim()).toEqual('FORM.YES')
    expect((icons[1].nativeElement as HTMLParagraphElement).innerHTML.trim()).toEqual('FORM.NO')
  })
})
