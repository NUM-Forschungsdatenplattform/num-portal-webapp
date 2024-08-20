import { Component, Directive, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AqlEditorService } from 'src/app/core/services/aql-editor/aql-editor.service'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { IAqlBuilderDialogInput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-input.interface'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { IAqlBuilderDialogOutput } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-output.interface'
import { IAqlValidationResponse } from 'src/app/shared/models/archetype-query-builder/aql-validation-response.interface'
import { IArchetypeQueryBuilder } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.interface'
import { IArchetypeQueryBuilderResponse } from 'src/app/shared/models/archetype-query-builder/archetype-query-builder.response.interface'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'
import { AqlEditorCeatorComponent as AqlEditorCreatorComponent } from './aql-editor-creator.component'
import {
  BUILDER_DIALOG_CONFIG,
  VALIDATION_ERROR_CONFIG,
  VALIDATION_SUCCESS_CONFIG,
} from './constants'

/* eslint-disable @typescript-eslint/naming-convention */
describe('AqlEditorCeatorComponent', () => {
  let component: AqlEditorCreatorComponent
  let fixture: ComponentFixture<AqlEditorCreatorComponent>

  const monacoEditorMock = {
    IMarkerData: {},
  }

  const monacoMock = {
    editor: monacoEditorMock,
    MarkerSeverity: {
      Error: 'ERROR',
    },
  }

  const validationResponse: IAqlValidationResponse = {
    valid: false,
    error: 'test',
    message: 'error message here',
    startColumn: 123,
    startLine: 321,
  }

  Object.defineProperty(window, 'monaco', {
    value: monacoMock,
  })

  const editorInitEmitter = new EventEmitter<any>()
  @Component({ selector: 'num-code-editor', template: '' })
  class CodeEditorStubComponent {
    @Input() value: string
    @Input() formatObservable$: any
    @Input() validationObservable$: any
    @Output() editorInit = editorInitEmitter
  }

  @Component({ selector: 'num-editor-determine-hits', template: '' })
  class EditorDetermineHitsStubComponent {
    @Input() isButtonDisabled: boolean
    @Input() content: IDetermineHits
    @Output() clicked = new EventEmitter()
  }

  @Directive({
    selector: '[numUserHasRole]',
  })
  class UserHasRoleStubDirective {
    @Input() numUserHasRole: string[]
  }

  let dialogCallParameter: DialogConfig
  const afterClosedSubject$ = new Subject<IAqlBuilderDialogOutput | void>()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((callParameter: any) => {
      dialogCallParameter = callParameter
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  const builderResponse: IArchetypeQueryBuilderResponse = {
    parameters: {},
    q: 'SELECT this',
  }

  const mockAqlEditorService = {
    buildAql: jest
      .fn()
      .mockImplementation((_aqbModel: IArchetypeQueryBuilder) => of(builderResponse)),
    validateAql: jest.fn(),
  } as unknown as AqlEditorService

  const mockAqlService = {
    getSize: jest.fn(),
  } as unknown as AqlService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AqlEditorCreatorComponent,
        CodeEditorStubComponent,
        ButtonComponent,
        EditorDetermineHitsStubComponent,
        UserHasRoleStubDirective,
      ],
      imports: [MaterialModule, TranslateModule.forRoot(), FontAwesomeTestingModule],
      providers: [
        { provide: DialogService, useValue: mockDialogService },
        { provide: AqlEditorService, useValue: mockAqlEditorService },
        { provide: AqlService, useValue: mockAqlService },
        { provide: ToastMessageService, useValue: mockToastMessageService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    fixture = TestBed.createComponent(AqlEditorCreatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
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
    const dialogContentPayload: IAqlBuilderDialogInput = {
      mode: AqlBuilderDialogMode.Criteria,
      model: new AqbUiModel(),
    }
    const dialogConfig: DialogConfig = {
      ...BUILDER_DIALOG_CONFIG,
      dialogContentPayload,
    }

    it('should open the dialog with the config including the content payload', () => {
      component.openBuilderDialog(AqlBuilderDialogMode.Criteria)
      expect(mockDialogService.openDialog).toHaveBeenCalledTimes(1)
      expect(dialogCallParameter.dialogContentComponent).toEqual(
        dialogConfig.dialogContentComponent
      )
      expect(dialogCallParameter.dialogContentPayload).toEqual(dialogConfig.dialogContentPayload)
    })

    describe('When the builder dialog is confirm-closed', () => {
      const dialogOutput: IAqlBuilderDialogOutput = {
        model: new AqbUiModel(),
        result: {
          parameters: { test: 'test' },
          q: 'test query',
        },
        selectedTemplateIds: ['temp1', 'temp2'],
      }
      beforeEach(() => {
        component.openBuilderDialog(AqlBuilderDialogMode.Criteria)
        afterClosedSubject$.next(dialogOutput)
      })
      it('should set the dialog result to the component', () => {
        expect(component.aqlQuery).toEqual(dialogOutput.result.q)
        expect(component.selectedTemplateIds).toEqual(dialogOutput.selectedTemplateIds)
        expect(component.aqbModel).toEqual(dialogOutput.model)
      })
    })

    it('should do nothing, when its not a confirm-close', () => {
      jest.spyOn(component, 'handleDialogConfirm')
      component.openBuilderDialog(AqlBuilderDialogMode.Criteria)
      afterClosedSubject$.next()
      expect(component.handleDialogConfirm).not.toHaveBeenCalled()
    })
  })

  describe('When a query is set', () => {
    const testcases = [
      { q: 'below 15 chars', result: false },
      {
        q: 'This is above 15 characters but is just not including the important words',
        result: false,
      },
      { q: 'This is above 15 characters but just includes the word select', result: false },
      { q: 'This is above 15 characters but just includes the word from', result: false },
      {
        q: 'This is above 15 characters and includes the words select, from',
        result: true,
      },
    ]

    test.each(testcases)('should validate as expected', (testcase) => {
      component.aqlQuery = testcase.q
      expect(component.isValidForExecution).toEqual(testcase.result)
    })
  })

  describe('When the query is supposed to be formatted', () => {
    it('should call next on the subject', (done) => {
      component.formatObservable$.subscribe(() => {
        expect(1).toEqual(1)
        done()
      })

      component.format()
    })
  })

  describe('When the query is supposed to be validated and is valid', () => {
    beforeEach(() => {
      jest
        .spyOn(mockAqlEditorService, 'validateAql')
        .mockImplementation(() => of({ valid: true } as IAqlValidationResponse))
    })
    it('it should display a message to the user that the query is valid and return true', async () => {
      const result = await component.validate(true)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(VALIDATION_SUCCESS_CONFIG)
      expect(result).toBeTruthy()
    })

    it('it should not display a message to the user that the query is valid and return true', async () => {
      const result = await component.validate(false)
      expect(mockToastMessageService.openToast).not.toHaveBeenCalledWith(VALIDATION_SUCCESS_CONFIG)
      expect(result).toBeTruthy()
    })
  })

  describe('When the query is supposed to be validated and is not valid', () => {
    beforeEach(() => {
      jest
        .spyOn(mockAqlEditorService, 'validateAql')
        .mockImplementation(() => of(validationResponse))
    })
    it('it should display a message to the user that the query is not valid and return false', async () => {
      const result = await component.validate()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(VALIDATION_ERROR_CONFIG)
      expect(result).toBeFalsy()
    })

    it('should push the error markers to the validation observable', (done) => {
      component.validationObservable$.subscribe((validationResult: any) => {
        expect(validationResult[0]).toBeTruthy()
        expect(validationResult[0].message).toEqual(validationResponse.message)
        expect(validationResult[0].startColumn).toEqual(validationResponse.startColumn)
        expect(validationResult[0].startLineNumber).toEqual(validationResponse.startLine)
        done()
      })
      component.validate().then((result) => {
        expect(result).toBeFalsy()
      })
    })
  })

  describe('When the validation is not successfull', () => {
    it('should display an error message to the user and return false', async () => {
      jest
        .spyOn(mockAqlEditorService, 'validateAql')
        .mockImplementationOnce(() => throwError('error'))

      const result = await component.validate()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(VALIDATION_ERROR_CONFIG)
      expect(result).toBeFalsy()
    })
  })

  describe('When the hits for the aql in the ehr are supposed to be fetched', () => {
    it('should call the aql service to get the size and set the count', async () => {
      jest.spyOn(mockAqlService, 'getSize').mockImplementation(() => of(123))
      component.aqlQuery = 'test'
      await component.determineHits()
      expect(mockAqlService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHitsContent.count).toEqual(123)
    })

    it('should display the too few hits error when it occurs', async () => {
      jest.spyOn(mockAqlService, 'getSize').mockImplementation(() => throwError({ status: 451 }))
      component.aqlQuery = 'test'
      await component.determineHits()
      expect(mockAqlService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHitsContent.message).toEqual('QUERIES.HITS.MESSAGE_ERROR_FEW_HITS')
      expect(component.determineHitsContent.count).toEqual(null)
    })

    it('should display the validation error when it occurs', async () => {
      jest.spyOn(mockAqlService, 'getSize').mockImplementation(() =>
        throwError({
          status: 400,
          error: {
            errors: [JSON.stringify(validationResponse)],
          },
        })
      )
      component.aqlQuery = 'test'
      await component.determineHits()
      expect(mockAqlService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHitsContent.message).toEqual('QUERIES.VALIDATION_ERROR')
      expect(component.determineHitsContent.count).toEqual(null)
    })

    it('should display the generic error when a 400 is not caused by validation', async () => {
      jest.spyOn(mockAqlService, 'getSize').mockImplementation(() =>
        throwError({
          status: 400,
          error: {
            errors: [JSON.stringify({ valid: true })],
          },
        })
      )
      component.aqlQuery = 'test'
      await component.determineHits()
      expect(mockAqlService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHitsContent.message).toEqual('QUERIES.HITS.MESSAGE_ERROR_MESSAGE')
      expect(component.determineHitsContent.count).toEqual(null)
    })

    it('should display the generic error when a 400 is not caused by validation', async () => {
      jest.spyOn(mockAqlService, 'getSize').mockImplementation(() => throwError({ status: 400 }))
      component.aqlQuery = 'test'
      await component.determineHits()
      expect(mockAqlService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHitsContent.message).toEqual('QUERIES.HITS.MESSAGE_ERROR_MESSAGE')
      expect(component.determineHitsContent.count).toEqual(null)
    })

    it('should display the generic error when a unkown error occurs', async () => {
      jest.spyOn(mockAqlService, 'getSize').mockImplementation(() => throwError({ status: 500 }))
      component.aqlQuery = 'test'
      await component.determineHits()
      expect(mockAqlService.getSize).toHaveBeenCalledTimes(1)
      expect(component.determineHitsContent.message).toEqual('QUERIES.HITS.MESSAGE_ERROR_MESSAGE')
      expect(component.determineHitsContent.count).toEqual(null)
    })

    it('should display the message that the aql must be set', async () => {
      await component.determineHits()
      expect(component.determineHitsContent.message).toEqual(
        'QUERIES.HITS.MESSAGE_SET_ALL_PARAMETERS'
      )
      expect(component.determineHitsContent.count).toEqual(null)
    })
  })
})
