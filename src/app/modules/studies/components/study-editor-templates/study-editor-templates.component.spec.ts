import { ComponentFixture, TestBed } from '@angular/core/testing'
import { StudyEditorTemplatesComponent } from './study-editor-templates.component'
import { IStudyTemplateInfoApi } from '../../../../shared/models/study/study-template-info-api.interface'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogAddTemplateComponent } from '../dialog-add-template/dialog-add-template.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from '../../../../layout/material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { DialogService } from '../../../../core/services/dialog.service'
import { Subject } from 'rxjs'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { ITemplateMetaDataApi } from '../../../../shared/models/template/template-api.interface'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ADD_DIALOG_CONFIG } from './constants'

describe('StudyEditorTemplatesComponent', () => {
  let component: StudyEditorTemplatesComponent
  let fixture: ComponentFixture<StudyEditorTemplatesComponent>

  const selectedTemplateEmitter = new EventEmitter<IStudyTemplateInfoApi[]>()
  @Component({ selector: 'num-add-template-selected-table', template: '' })
  class AddTemplatesSelectedTableStubComponent {
    @Input() selectedTemplates: any
    @Output() selectedTemplatesChange = selectedTemplateEmitter
  }

  const templateRow: ITemplateMetaDataApi = {
    templateId: '123',
    archetypeId: '123',
    createdOn: '2020-12-07T21:19:18.980Z',
    name: 'Template test',
  }

  const studyTemplate: IStudyTemplateInfoApi = {
    id: templateRow.templateId,
    name: templateRow.name,
  }

  const studyTemplateArr: IStudyTemplateInfoApi[] = [studyTemplate]

  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StudyEditorTemplatesComponent,
        ButtonComponent,
        AddTemplatesSelectedTableStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        FormsModule,
      ],
      providers: [{ provide: DialogService, useValue: mockDialogService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEditorTemplatesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When template are supposed to be added to the list', () => {
    const dialogContentPayload: IStudyTemplateInfoApi[] = studyTemplateArr
    const dialogConfig: DialogConfig = {
      ...ADD_DIALOG_CONFIG,
      dialogContentComponent: DialogAddTemplateComponent,
      dialogContentPayload,
    }

    it('should open the dialog with the list of existing templates', () => {
      component.templates = studyTemplateArr
      fixture.detectChanges()
      component.addTemplate()
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })
  })
})
