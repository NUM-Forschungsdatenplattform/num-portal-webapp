import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor.service'
import { DialogService } from 'src/app/core/services/dialog.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'
import { DialogAqlBuilderComponent } from '../dialog-aql-builder/dialog-aql-builder.component'

import { AqlEditorCeatorComponent as AqlEditorCreatorComponent } from './aql-editor-creator.component'
import { BUILDER_DIALOG_CONFIG } from './constants'

describe('AqlEditorCeatorComponent', () => {
  let component: AqlEditorCreatorComponent
  let fixture: ComponentFixture<AqlEditorCreatorComponent>

  const editorInitEmitter = new EventEmitter<any>()
  @Component({ selector: 'num-code-editor', template: '' })
  class CodeEditorStubComponent {
    @Input() value: string
    @Output() editorInit = editorInitEmitter
  }

  let dialogCallParameter: DialogConfig
  const afterClosedSubject$ = new Subject()
  const mockDialogService = ({
    openDialog: jest.fn().mockImplementation((callParameter: any) => {
      dialogCallParameter = callParameter
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown) as DialogService

  const mockAqlEditorService = ({
    buildAql: jest.fn().mockImplementation((aqbModel: IArchetypeQueryBuilder) => of('test')),
  } as unknown) as AqlEditorService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqlEditorCreatorComponent, CodeEditorStubComponent, ButtonComponent],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        { provide: DialogService, useValue: mockDialogService },
        { provide: AqlEditorService, useValue: mockAqlEditorService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AqlEditorCreatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the code-editor emits the init event', () => {
    beforeEach(() => {
      editorInitEmitter.emit('test')
    })
    it('should assign the reference to the editor in this componenent', () => {
      expect(component.editor).toEqual('test')
    })
  })

  describe('When a query is supposed to be created with the builder', () => {
    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentComponent: DialogAqlBuilderComponent,
      dialogContentPayload: new AqbUiModel(),
    }

    it('should open the dialog with the config including the content payload', () => {
      component.openBuilderDialog()
      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)
      expect(dialogCallParameter.dialogContentComponent).toEqual(
        dialogConfig.dialogContentComponent
      )
      expect(dialogCallParameter.dialogContentPayload).toEqual(dialogConfig.dialogContentPayload)
    })
  })
})
