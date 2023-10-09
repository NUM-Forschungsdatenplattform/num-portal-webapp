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

import { MonacoLoaderService } from './monaco-loader.service'

describe('MonacoLoaderService', () => {
  const monacoPath = './vs'
  let service: MonacoLoaderService

  beforeEach(() => {
    service = new MonacoLoaderService()
    jest.restoreAllMocks()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('When the monaco editor is supposed to be loaded', () => {
    describe('and was not loaded before', () => {
      beforeEach(() => {
        service.isLoaded = false
      })
      it('should use require to load the editor if require is defined', async () => {
        delete (window as any).require

        const requireMock = jest.fn().mockImplementation((files, callBack) => {
          expect(files).toEqual([`${monacoPath}/editor/editor.main`])
          callBack()
        })

        Object.defineProperty(window, 'require', {
          configurable: true,
          enumerable: true,
          value: requireMock,
          writable: true,
        })

        await service.loadMonaco()
        expect((window as any).require).toHaveBeenCalledTimes(1)
      })

      it('should use require to load the editor if require is not defined', (done) => {
        let appendedChild: HTMLScriptElement
        delete (window as any).require
        const eventListenerMock = jest.fn().mockImplementation((type, onLoadCallBack) => {
          const requireMock = jest.fn().mockImplementation((files, requireCallback) => {
            requireCallback()
          })
          Object.defineProperty(window, 'require', {
            configurable: true,
            enumerable: true,
            value: requireMock,
            writable: true,
          })
          onLoadCallBack()
        })

        jest.spyOn(document, 'createElement').mockImplementation((type: string) => {
          if (type === 'script') {
            const mockScriptElement = {
              addEventListener: eventListenerMock,
            } as unknown as HTMLScriptElement
            return mockScriptElement
          }
        })

        jest
          .spyOn(document.body, 'appendChild')
          .mockImplementation((newChild: HTMLScriptElement) => {
            appendedChild = newChild
            return newChild
          })

        service.loadMonaco().then(() => {
          expect(document.body.appendChild).toHaveBeenCalledTimes(1)
          expect(appendedChild.src).toEqual(`${monacoPath}/loader.js`)
          done()
        })
      })
    })

    describe('and was loaded before', () => {
      beforeEach(() => {
        service.isLoaded = true
      })

      it('should resolve the promise and not load again', async () => {
        jest.spyOn(service as any, 'fetchMonacoWithAmd')
        await service.loadMonaco()
        expect((service as any).fetchMonacoWithAmd).not.toHaveBeenCalled()
      })
    })
  })
})
