import { DatePipe } from '@angular/common'
import { TranslateService } from '@ngx-translate/core'
import { LocalizedDatePipe } from './localized-date.pipe'

describe('LocalizedDatePipe', () => {
  let pipe: LocalizedDatePipe

  const translateService = {
    currentLang: 'de',
  } as TranslateService

  const datePipe = {
    transform: (value, format, timezone, locale) => '',
  } as DatePipe

  beforeEach(() => {
    pipe = new LocalizedDatePipe(translateService, datePipe)
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('should set locale in datePipe', () => {
    const timestamp = '1607684353809'
    jest.spyOn(datePipe, 'transform')
    pipe.transform(timestamp)
    expect(datePipe.transform).toHaveBeenCalledWith(timestamp, 'mediumDate', undefined, 'de')
  })
})
