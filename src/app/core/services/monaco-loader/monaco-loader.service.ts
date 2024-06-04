import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MonacoLoaderService {
  readonly monacoPath = './vs'
  constructor() {}

  isLoaded: boolean

  async loadMonaco(): Promise<void> {
    if (this.isLoaded || typeof (window as any).monaco === 'object') {
      return
    } else {
      if (!(window as any).require) {
        await this.getLoaderJs()
      }
      await this.fetchMonacoWithAmd()
    }
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
