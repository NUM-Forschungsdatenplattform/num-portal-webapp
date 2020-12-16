import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MonacoLoaderService } from 'src/app/core/services/monaco-loader.service'
import { numAqlTokenProvider } from '../../num-aql-token.provider'
import { numEditorTheme } from '../../num-editor.theme'

import { CodeEditorComponent } from './code-editor.component'

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent
  let fixture: ComponentFixture<CodeEditorComponent>

  const LANG_NAME = 'num-aql'

  const codeEditorMock = {
    dispose: jest.fn(),
    onDidChangeModelContent: jest.fn(),
    setValue: jest.fn(),
    layout: jest.fn(),
  }

  const monacoEditorMock = {
    defineTheme: jest.fn(),
    create: jest.fn().mockImplementation(() => codeEditorMock),
  }

  const monacoLanguageMock = {
    register: jest.fn(),
    setMonarchTokensProvider: jest.fn(),
  }

  const monacoMock = {
    editor: monacoEditorMock,
    languages: monacoLanguageMock,
  }

  Object.defineProperty(window, 'monaco', {
    value: monacoMock,
  })

  const monacoLoaderService = ({
    loadMonaco: jest.fn().mockResolvedValue(() => {}),
  } as unknown) as MonacoLoaderService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeEditorComponent],
      providers: [{ provide: MonacoLoaderService, useValue: monacoLoaderService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent)
    component = fixture.componentInstance
    jest.spyOn(component.editorInit, 'emit')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call loader service', () => {
    expect(monacoLoaderService.loadMonaco).toHaveBeenCalled()
  })

  it('should register the num aql lang', () => {
    expect(monacoLanguageMock.register).toHaveBeenCalledWith({ id: LANG_NAME })
  })

  it('should set the MonarchTokensProvider', () => {
    expect(monacoLanguageMock.setMonarchTokensProvider).toHaveBeenCalledWith(
      LANG_NAME,
      numAqlTokenProvider
    )
  })

  it('should register the num lang theme', () => {
    expect(monacoEditorMock.defineTheme).toHaveBeenCalledWith('num-editor-theme', numEditorTheme)
  })

  it('should emit the editor init event', () => {
    expect(component.editorInit.emit).toHaveBeenCalled()
  })

  it('should re-layout the editor on resize event', () => {
    window.dispatchEvent(new Event('resize'))
    expect(codeEditorMock.layout).toHaveBeenCalledTimes(1)
  })

  it('should set the value of the editor when the input changes', () => {
    component.value = 'test'
    fixture.detectChanges()
    expect(codeEditorMock.setValue).toHaveBeenCalledWith('test')
  })
})
