import { lastValueFrom } from 'rxjs'
import { WebpackTranslateLoader } from './webpack-translate-loader'

describe('WebpackTranslateLoader', () => {
  let loader: WebpackTranslateLoader

  beforeEach(() => {
    loader = new WebpackTranslateLoader()
  })

  test.each(['de', 'en'])('should load the language', async (lang) => {
    const result = lastValueFrom(loader.getTranslation(lang))
    expect(result).toBeDefined()
  })
})
