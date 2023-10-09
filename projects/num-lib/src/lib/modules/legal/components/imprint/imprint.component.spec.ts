import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ImprintComponent } from './imprint.component'
import { LangChangeEvent } from '@ngx-translate/core'
import { Injector } from '@angular/core'

describe('ImprintComponent', () => {
  let component: ImprintComponent
  let fixture: ComponentFixture<ImprintComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ImprintComponent],
      providers: [TranslateService],
    }).compileComponents()
  })

  beforeEach(() => {
    const injector: Injector = getTestBed()
    const translate: TranslateService = injector.get(TranslateService)
    jest.spyOn(translate, 'instant').mockImplementation(() => [])
    fixture = TestBed.createComponent(ImprintComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the profs property with the translated texts', () => {
    const translateService = TestBed.inject(TranslateService)
    jest.spyOn(translateService, 'instant').mockReturnValue(['Translated Texts'])
    component.ngOnInit()
    expect(component.profs).toEqual(['Translated Texts'])
  })

  it('should update the profs property when the language changes', () => {
    const translateService = TestBed.inject(TranslateService)
    jest.spyOn(translateService, 'instant').mockReturnValue(['Translated Texts'])
    component.ngOnInit()
    expect(component.profs).toEqual(['Translated Texts'])

    jest.spyOn(translateService.onLangChange, 'subscribe')
    translateService.onLangChange.next({ lang: 'en', translations: {} } as LangChangeEvent)
    expect(translateService.instant).toHaveBeenCalledWith('IMPRINT.TEXTS.PROFS')
    expect(component.profs).toEqual(['Translated Texts'])
  })
})
