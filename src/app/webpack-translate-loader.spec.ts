import { WebpackTranslateLoader } from './webpack-translate-loader'

describe('WebpackTranslateLoader', () => {
  let loader: WebpackTranslateLoader

  beforeEach(() => {
    loader = new WebpackTranslateLoader()
  })

  test.each(['de', 'en'])('should load the language', async (lang) => {
    const result = loader.getTranslation(lang).toPromise()
    expect(result).toBeDefined()
  })
})
