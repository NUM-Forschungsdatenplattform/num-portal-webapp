import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LanguageComponent } from './language.component'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { MaterialModule } from '../../material/material.module'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { DateAdapter } from '@angular/material/core'

describe('LanguageComponent', () => {
  let component: LanguageComponent
  let fixture: ComponentFixture<LanguageComponent>
  let translate: TranslateService

  const dateAdapterMock = ({
    setLocale: jest.fn(),
  } as unknown) as DateAdapter<Date>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageComponent],
      imports: [TranslateModule.forRoot(), FontAwesomeTestingModule, MaterialModule],
      providers: [
        TranslateService,
        {
          provide: DateAdapter,
          useValue: dateAdapterMock,
        },
      ],
    }).compileComponents()

    localStorage.removeItem('lang')
  })

  describe('With browser language de', () => {
    beforeEach(() => {
      translate = TestBed.inject(TranslateService)
      jest.spyOn(translate, 'getBrowserLang').mockImplementation(() => 'de')
      jest.spyOn(translate, 'use')
      fixture = TestBed.createComponent(LanguageComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create and use de', () => {
      expect(component).toBeTruthy()
      expect(translate.use).toHaveBeenCalledWith('de')
      expect(localStorage.getItem('lang')).toEqual('de')
    })
  })

  describe('With browser language en', () => {
    beforeEach(() => {
      translate = TestBed.inject(TranslateService)
      jest.spyOn(translate, 'getBrowserLang').mockImplementation(() => 'en')
      jest.spyOn(translate, 'use')
      fixture = TestBed.createComponent(LanguageComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create and use en', () => {
      expect(component).toBeTruthy()
      expect(translate.use).toHaveBeenCalledWith('en')
      expect(localStorage.getItem('lang')).toEqual('en')
    })
  })

  describe('With unsupported browser language', () => {
    beforeEach(() => {
      translate = TestBed.inject(TranslateService)
      jest.spyOn(translate, 'getBrowserLang').mockImplementation(() => 'nope')
      jest.spyOn(translate, 'use')
      fixture = TestBed.createComponent(LanguageComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create and fallback to de', () => {
      expect(component).toBeTruthy()
      expect(component.translate.use).toHaveBeenCalledWith('de')
      expect(localStorage.getItem('lang')).toEqual('de')
    })
  })

  describe('With browser language de, but with LocalStorage language en', () => {
    beforeEach(() => {
      translate = TestBed.inject(TranslateService)
      jest.spyOn(translate, 'getBrowserLang').mockImplementation(() => 'de')
      jest.spyOn(translate, 'use')
      localStorage.setItem('lang', 'en')
      fixture = TestBed.createComponent(LanguageComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create and use en', () => {
      expect(component).toBeTruthy()
      expect(translate.use).toHaveBeenCalledWith('en')
    })
  })

  describe('When the locale gets set', () => {
    it('should set the dateAdapters locale', () => {
      jest.spyOn(dateAdapterMock, 'setLocale').mockImplementation()
      const locale = 'de'
      component.setLocale(locale)
      expect(dateAdapterMock.setLocale).toHaveBeenCalledWith(locale)
    })
  })
})
