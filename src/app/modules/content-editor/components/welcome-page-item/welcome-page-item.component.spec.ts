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

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { ButtonComponent } from 'src/app/shared/components/button/button.component'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { EDIT_DIALOG_CONFIG } from './constants'

import { WelcomePageItemComponent } from './welcome-page-item.component'

describe('WelcomePageItemComponent', () => {
  let component: WelcomePageItemComponent
  let fixture: ComponentFixture<WelcomePageItemComponent>

  const contentInitial = {
    imageId: 'codex.jpg',
    url: 'url',
    de: {
      title: 'titleGerman',
      text: 'bodyTextGerman',
    },
    en: {
      title: 'titleEnglish',
      text: 'bodyTextEnglish',
    },
  }

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
      declarations: [WelcomePageItemComponent, ButtonComponent],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        MaterialModule,
        FontAwesomeTestingModule,
        FlexLayoutModule,
      ],
      providers: [
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageItemComponent)
    component = fixture.componentInstance
    component.index = 0
    component.displayLang = 'de'
    component.form = new FormGroup({
      titleEnglish: new FormControl('titleEnglish'),
      titleGerman: new FormControl('titleGerman'),
      bodyTextEnglish: new FormControl('bodyTextEnglish'),
      bodyTextGerman: new FormControl('bodyTextGerman'),
      url: new FormControl('url'),
      imageId: new FormControl(),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should map the form fields to the component on init', () => {
    expect(component.cardContent).toEqual(contentInitial)
  })

  describe('On the attempt to edit the item', () => {
    let dialogConfig: DialogConfig

    beforeEach(() => {
      dialogConfig = {
        ...EDIT_DIALOG_CONFIG,
        dialogContentPayload: component.form,
      }
    })
    it('should open the dialog with the dialogConfig', () => {
      component.editItem()
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(dialogConfig)
    })

    it('should ignore other confirmresults', () => {
      component.editItem()
      afterClosedSubject$.next()
      expect(component.cardContent).toEqual(contentInitial)
    })

    it('should set the new values to the component on confirmation', () => {
      const form = new FormGroup({
        titleEnglish: new FormControl('newTitleEn'),
        titleGerman: new FormControl('newTitleGer'),
        bodyTextEnglish: new FormControl('newTextEn'),
        bodyTextGerman: new FormControl('newTextGer'),
        url: new FormControl('url/test'),
        imageId: new FormControl('INFORMATION'),
      })

      component.editItem()
      afterClosedSubject$.next(form)

      expect(component.cardContent).toEqual({
        imageId: 'information.jpg',
        url: 'url/test',
        de: {
          title: 'newTitleGer',
          text: 'newTextGer',
        },
        en: {
          title: 'newTitleEn',
          text: 'newTextEn',
        },
      })
    })
  })
})
