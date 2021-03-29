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

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MonacoLoaderService {
  readonly monacoPath = './vs'
  constructor() {}

  isLoaded: boolean

  loadMonaco(): Promise<void> {
    return new Promise(async (resolve) => {
      if (this.isLoaded || typeof (window as any).monaco === 'object') {
        return resolve()
      } else {
        if (!(window as any).require) {
          await this.getLoaderJs()
        }
        this.fetchMonacoWithAmd().then(() => {
          return resolve()
        })
      }
    })
  }

  private fetchMonacoWithAmd(): Promise<void> {
    return new Promise((resolve) => {
      const windowAny = window as any
      windowAny.require([`${this.monacoPath}/editor/editor.main`], () => {
        this.isLoaded = true
        return resolve()
      })
    })
  }

  private getLoaderJs(): Promise<void> {
    return new Promise((resolve) => {
      const injectedScriptTag: HTMLScriptElement = document.createElement('script')
      injectedScriptTag.type = 'text/javascript'
      injectedScriptTag.src = `${this.monacoPath}/loader.js`
      injectedScriptTag.id = 'loader-js'
      injectedScriptTag.addEventListener('load', () => resolve())
      document.body.appendChild(injectedScriptTag)
    })
  }
}
