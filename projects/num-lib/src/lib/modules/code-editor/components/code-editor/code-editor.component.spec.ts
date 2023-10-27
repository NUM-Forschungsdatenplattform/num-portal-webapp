/**
 * Copyright 2021 Vitagroup AG
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

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Subject } from 'rxjs'
import { NumAqlFormattingProvider } from '../../num-aql-formatting-provider'
import { numAqlTokenProvider } from '../../num-aql-token.provider'
import { numEditorTheme } from '../../num-editor.theme'

import { CodeEditorComponent } from './code-editor.component'
import { MonacoLoaderService } from '../../../../core/services/monaco-loader/monaco-loader.service'

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent
  let fixture: ComponentFixture<CodeEditorComponent>

  const LANG_NAME = 'num-aql'

  const formatSubject$ = new Subject()
  const validateSubject$ = new Subject<any>()

  let onDidChangeModelContentCallback
  const codeEditorMock = {
    dispose: jest.fn(),
    onDidChangeModelContent: jest.fn().mockImplementation((callback) => {
      onDidChangeModelContentCallback = callback
    }),
    setValue: jest.fn(),
    getValue: jest.fn(),
    layout: jest.fn(),
    getAction: jest.fn(),
    getModel: jest.fn(),
  }

  const monacoEditorMock = {
    setModelMarkers: jest.fn(),
    defineTheme: jest.fn(),
    create: jest.fn().mockImplementation(() => codeEditorMock),
  }

  const formatterMock = {
    format: jest.fn(),
  } as unknown as NumAqlFormattingProvider

  const monacoLanguageMock = {
    register: jest.fn(),
    setMonarchTokensProvider: jest.fn(),
    registerDocumentFormattingEditProvider: jest.fn(),
  }

  const monacoMock = {
    editor: monacoEditorMock,
    languages: monacoLanguageMock,
  }

  Object.defineProperty(window, 'monaco', {
    value: monacoMock,
  })

  const monacoLoaderService = {
    loadMonaco: jest.fn().mockResolvedValue(() => {}),
  } as unknown as MonacoLoaderService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeEditorComponent],
      providers: [{ provide: MonacoLoaderService, useValue: monacoLoaderService }],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent)
    component = fixture.componentInstance
    component.formatter = formatterMock
    component.formatObservable$ = formatSubject$.asObservable()
    component.validationObservable$ = validateSubject$.asObservable()
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

  it('should register the DocumentFormattingEditProvider', () => {
    component.formatter = formatterMock
    expect(monacoLanguageMock.registerDocumentFormattingEditProvider).toHaveBeenCalledWith(
      LANG_NAME,
      {
        provideDocumentFormattingEdits: formatterMock.format,
      }
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

  it('should run the formatting on new pushes of the formatObservable', () => {
    let isTriggered = false
    jest.spyOn(formatterMock, 'format').mockImplementation()
    jest.spyOn(codeEditorMock, 'getAction').mockImplementation(() => {
      return {
        run: () => (isTriggered = true),
      }
    })

    component.value = 'test'

    formatSubject$.next()
    fixture.detectChanges()
    expect(isTriggered).toBeTruthy()
  })

  it('should set markers on new pushes to the validationObservable', () => {
    const markers = { mock: 'true' }
    jest.spyOn(monacoEditorMock, 'setModelMarkers').mockImplementation()
    jest.spyOn(codeEditorMock, 'getModel').mockImplementation(() => 'model')
    validateSubject$.next(markers)
    fixture.detectChanges()
    expect(monacoEditorMock.setModelMarkers).toHaveBeenCalledWith(
      'model',
      'validationError',
      markers
    )
  })

  it('should emit value changes', () => {
    jest.spyOn(component.valueChange, 'emit')
    jest.spyOn(codeEditorMock, 'getValue').mockImplementation(() => 'test value')
    onDidChangeModelContentCallback()
    expect(component.valueChange.emit).toHaveBeenCalledWith('test value')
  })
})
