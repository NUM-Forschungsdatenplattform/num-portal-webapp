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

import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { mockNavigationLinks } from 'src/mocks/data-mocks/navigation-links.mock'
import { SAVE_NAVIGATION_ERROR_CONFIG, SAVE_NAVIGATION_SUCCESS_CONFIG } from './constants'

import { NavigationEditorComponent } from './navigation-editor.component'

describe('NavigationEditorComponent', () => {
  let component: NavigationEditorComponent
  let fixture: ComponentFixture<NavigationEditorComponent>

  @Component({ selector: 'num-navigation-editor-item', template: '' })
  class NavigationEditorItemStubComponent {
    @Input() index: any
    @Input() form: any
    @Input() isLoading: any
  }

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const navigationLinkSubject = new Subject()
  const mockContentService = {
    getNavigationLinks: jest.fn(),
    updateNavigationLinks: jest.fn(),
    navigationLinksObservable$: navigationLinkSubject.asObservable(),
  } as unknown as ContentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationEditorComponent, NavigationEditorItemStubComponent, ButtonComponent],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        FontAwesomeTestingModule,
      ],
      providers: [
        { provide: ContentService, useValue: mockContentService },
        { provide: ToastMessageService, useValue: mockToastMessageService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest
      .spyOn(mockContentService, 'getNavigationLinks')
      .mockImplementation(() => of(mockNavigationLinks))
    fixture = TestBed.createComponent(NavigationEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch the navigation links on init and set isLoading to false then', async () => {
    expect(mockContentService.getNavigationLinks).toHaveBeenCalled()
    expect(component.isLoading).toBeFalsy()
    expect(component.navigationItems).toBeFalsy()
    navigationLinkSubject.next(mockNavigationLinks)
    await fixture.whenStable()
    expect(component.navigationItems).toEqual(mockNavigationLinks)
  })

  it('should generate the form and set the data to it', async () => {
    expect(component.navigationLinks.value.length).toEqual(5)
    expect(component.navigationLinks.value[0].title).toBeFalsy()

    navigationLinkSubject.next(mockNavigationLinks)
    await fixture.whenStable()
    expect(component.navigationLinks.value[0].title).toEqual(mockNavigationLinks[0].title)
  })

  it('should reset the values to the previous saved values on discard button', async () => {
    const nativeElement = fixture.debugElement.nativeElement
    const discardButton = nativeElement
      .querySelector(`[data-test="content-editor__navigation__discard-button"]`)
      .querySelector('button') as HTMLElement

    navigationLinkSubject.next(mockNavigationLinks)
    await fixture.whenStable()
    component.navigationItems = [mockNavigationLinks[0]]
    expect(component.navigationLinks.value[1].title).toEqual(mockNavigationLinks[1].title)

    discardButton.click()
    fixture.detectChanges()
    expect(component.navigationLinks.value[1].title).not.toEqual(mockNavigationLinks[1].title)
  })

  describe('It should validate on input', () => {
    const testCases = [
      {
        title: 'Test',
        url: '',
        isValid: false,
      },
      {
        title: 'Test',
        url: 'https://domain.com',
        isValid: true,
      },
      {
        title: '',
        url: '',
        isValid: true,
      },
      {
        title: '',
        url: 'https://domain.com',
        isValid: false,
      },
    ]

    test.each(testCases)('should validate as expected', (testCase) => {
      component.patchForm([
        {
          title: testCase.title,
          url: testCase.url,
        },
      ])

      fixture.detectChanges()
      expect(component.navigationForm.valid).toEqual(testCase.isValid)
    })
  })

  describe('On the attempt to save the data', () => {
    let saveButton: HTMLElement

    beforeEach(() => {
      const nativeElement = fixture.debugElement.nativeElement
      saveButton = nativeElement
        .querySelector(`[data-test="content-editor__navigation__save-button"]`)
        .querySelector('button') as HTMLElement
    })
    it('should set the loading state and post the valid links to the service - empty inputs', () => {
      const updateSubject$ = new Subject<any>()
      jest
        .spyOn(mockContentService, 'updateNavigationLinks')
        .mockImplementation(() => updateSubject$.asObservable())

      saveButton.click()
      expect(component.isLoading).toBeTruthy()
      expect(mockContentService.updateNavigationLinks).toHaveBeenCalledWith([])
      updateSubject$.next(mockNavigationLinks)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(SAVE_NAVIGATION_SUCCESS_CONFIG)
      expect(component.isLoading).toBeFalsy()
    })

    it('should set the loading state and post the valid links to the service - filled inputs', async () => {
      const updateSubject$ = new Subject<any>()
      jest
        .spyOn(mockContentService, 'updateNavigationLinks')
        .mockImplementation(() => updateSubject$.asObservable())

      navigationLinkSubject.next(mockNavigationLinks)
      await fixture.whenStable()

      saveButton.click()
      expect(component.isLoading).toBeTruthy()
      expect(mockContentService.updateNavigationLinks).toHaveBeenCalledWith(mockNavigationLinks)
      updateSubject$.next(mockNavigationLinks)
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(SAVE_NAVIGATION_SUCCESS_CONFIG)
      expect(component.isLoading).toBeFalsy()
    })

    it('should set the loading state and display an error message on error', () => {
      const updateSubject$ = new Subject<any>()
      jest
        .spyOn(mockContentService, 'updateNavigationLinks')
        .mockImplementation(() => updateSubject$.asObservable())

      saveButton.click()
      expect(component.isLoading).toBeTruthy()
      expect(mockContentService.updateNavigationLinks).toHaveBeenCalledWith([])
      updateSubject$.error(new Error('error'))
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(SAVE_NAVIGATION_ERROR_CONFIG)
      expect(component.isLoading).toBeFalsy()
    })
  })
})
