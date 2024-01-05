/**
 * Copyright 2023 Vitagroup AG
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
