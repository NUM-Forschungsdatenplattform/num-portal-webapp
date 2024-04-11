import { Component, Injector } from '@angular/core'
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { DataProtectionComponent } from './data-protection.component'
import { LangChangeEvent } from '@ngx-translate/core'

describe('DataProtectionComponent', () => {
  let component: DataProtectionComponent
  let fixture: ComponentFixture<DataProtectionComponent>
  let translateService: TranslateService

  @Component({
    selector: 'num-operation-administration',
    template: '',
  })
  class OperationAdministrationStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataProtectionComponent, OperationAdministrationStubComponent],
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService],
    }).compileComponents()
  })

  beforeEach(() => {
    const injector: Injector = getTestBed()
    const translate: TranslateService = injector.get(TranslateService)
    jest.spyOn(translate, 'instant').mockImplementation(() => [])
    fixture = TestBed.createComponent(DataProtectionComponent)
    component = fixture.componentInstance
    translateService = TestBed.inject(TranslateService)
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize the component with the translated texts', () => {
    jest.spyOn(translateService, 'instant').mockReturnValue('translated text')

    component.ngOnInit()

    expect(component.generalDataList).toEqual('translated text')
    expect(component.registrationList).toEqual('translated text')
    expect(component.cookiesList).toEqual('translated text')
    expect(component.recipientsList).toEqual('translated text')
    expect(component.rightsList).toEqual('translated text')
    expect(component.decisionList).toEqual('translated text')
  })

  it('should update the component with the translated texts when the language changes', () => {
    jest.spyOn(translateService, 'instant').mockReturnValue('translated text')
    component.ngOnInit()

    translateService.onLangChange.next({ lang: 'en', translations: {} } as LangChangeEvent)

    expect(component.generalDataList).toEqual('translated text')
    expect(component.registrationList).toEqual('translated text')
    expect(component.cookiesList).toEqual('translated text')
    expect(component.recipientsList).toEqual('translated text')
    expect(component.rightsList).toEqual('translated text')
    expect(component.decisionList).toEqual('translated text')
  })

  it('should unsubscribe from all subscriptions when the component is destroyed', () => {
    jest.spyOn(component.subscriptions, 'unsubscribe')

    component.ngOnDestroy()

    expect(component.subscriptions.unsubscribe).toHaveBeenCalled()
  })
})
