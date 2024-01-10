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

import { CdkDragDrop } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { of, Subject, throwError } from 'rxjs'
import { mockDashboardCards } from 'src/mocks/data-mocks/dashboard-cards.mock'
import { SAVE_ERROR_CONFIG, SAVE_SUCCESS_CONFIG } from './constants'

import { WelcomePageEditorComponent } from './welcome-page-editor.component'
import { ContentService } from '../../../../core/services/content/content.service'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { ToastMessageService } from '../../../../core/services/toast-message/toast-message.service'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { ButtonComponent } from '../../../../shared/components/button/button.component'

describe('WelcomePageEditorComponent', () => {
  let component: WelcomePageEditorComponent
  let fixture: ComponentFixture<WelcomePageEditorComponent>

  const form = new FormGroup({
    titleEnglish: new FormControl('newTitleEn'),
    titleGerman: new FormControl('newTitleGer'),
    bodyTextEnglish: new FormControl('newTextEn'),
    bodyTextGerman: new FormControl('newTextGer'),
    url: new FormControl('url/test'),
    imageId: new FormControl('INFORMATION'),
  })

  const moveUpEmitter = new EventEmitter()
  const moveDownEmitter = new EventEmitter()
  const deleteEmitter = new EventEmitter()
  @Component({ selector: 'num-welcome-page-item', template: '' })
  class WelcomePageItemStubComponent {
    @Input() index: number
    @Input() isLast: boolean
    @Input() form: FormGroup
    @Input() isLoading: boolean
    @Input() displayLang: 'de' | 'en'
    @Output() moveUp = moveUpEmitter
    @Output() moveDown = moveDownEmitter
    @Output() delete = deleteEmitter
  }

  const mockContentService = {
    getCards: jest.fn(),
    updateCards: jest.fn(),
  } as unknown as ContentService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  const afterClosedSubject$ = new Subject()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomePageEditorComponent, ButtonComponent, WelcomePageItemStubComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        FontAwesomeTestingModule,
      ],
      providers: [
        {
          provide: ContentService,
          useValue: mockContentService,
        },
        {
          provide: ToastMessageService,
          useValue: mockToastMessageService,
        },
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(mockContentService, 'getCards').mockImplementation(() => of(mockDashboardCards))
    fixture = TestBed.createComponent(WelcomePageEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should build the formgroup on init', () => {
    expect(component.dashboardCards.value.length).toEqual(mockDashboardCards.length)
  })

  it('should set the cards from the api to the component', () => {
    expect(component.cards).toEqual(mockDashboardCards)
  })

  describe('On the attempt to add a new item', () => {
    it('should open the dialog with the dialogConfig', () => {
      component.addItem()
      expect(mockDialogService.openDialog).toHaveBeenCalled()
    })

    it('should ignore other confirmresults', () => {
      component.addItem()
      afterClosedSubject$.next()
      expect(component.dashboardCards.value.length).toEqual(mockDashboardCards.length)
    })

    it('should ignore the command if max is reached', () => {
      let i = component.dashboardCards.value.length
      for (i; i < 8; i++) {
        component.dashboardCards.insert(0, form)
      }
      expect(component.dashboardCards.value.length).toEqual(8)
      component.addItem()
      expect(mockDialogService.openDialog).not.toHaveBeenCalled()
    })

    it('should set the new values to the component on confirmation', () => {
      component.addItem()
      afterClosedSubject$.next(form)

      expect(component.dashboardCards.value.length).toEqual(mockDashboardCards.length + 1)
    })
  })

  it('should reset the values on discard action', () => {
    component.dashboardCards.insert(0, form)
    expect(component.dashboardCards.value.length).not.toEqual(mockDashboardCards.length)
    component.discard()
    expect(component.dashboardCards.value.length).toEqual(mockDashboardCards.length)
  })

  it('should be able to delete items', () => {
    expect(component.dashboardCards.value.length).toEqual(mockDashboardCards.length)
    component.deleteItem(0)
    expect(component.dashboardCards.value.length).not.toEqual(mockDashboardCards.length)
  })

  it('should move the element according to the drop event', () => {
    const dropEvent = {
      previousIndex: 1,
      currentIndex: 0,
    } as unknown as CdkDragDrop<string[]>

    component.drop(dropEvent)
    expect(component.dashboardCards.value[0].titleGerman).toEqual(mockDashboardCards[1].de.title)
  })

  describe('When the result is supposed to be saved', () => {
    it('should call the service with the api model', () => {
      jest.spyOn(mockContentService, 'updateCards').mockImplementation(() => of(mockDashboardCards))
      component.save()
      expect(mockContentService.updateCards).toHaveBeenCalled()
    })

    it('should show the success message', () => {
      jest.spyOn(mockContentService, 'updateCards').mockImplementation(() => of(mockDashboardCards))
      jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
      component.save()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(SAVE_SUCCESS_CONFIG)
    })

    it('should show the error message', () => {
      jest.spyOn(mockContentService, 'updateCards').mockImplementation(() => throwError('error'))
      jest.spyOn(mockToastMessageService, 'openToast').mockImplementation()
      component.save()
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(SAVE_ERROR_CONFIG)
    })
  })
})
