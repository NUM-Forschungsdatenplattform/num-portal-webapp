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

import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { Subscription } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { INavigationLink } from 'src/app/shared/models/content/navigation-link.interface'
import { SAVE_NAVIGATION_SUCCESS_CONFIG, SAVE_NAVIGATION_ERROR_CONFIG } from './constants'

@Component({
  selector: 'num-navigation-editor',
  templateUrl: './navigation-editor.component.html',
  styleUrls: ['./navigation-editor.component.scss'],
})
export class NavigationEditorComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  constructor(
    private formBuilder: UntypedFormBuilder,
    private contentService: ContentService,
    private toastMessageService: ToastMessageService
  ) {}

  isLoading = true

  navigationItems: INavigationLink[]

  navigationForm = new UntypedFormGroup({
    navigationItems: this.formBuilder.array([]),
  })
  get navigationLinks(): UntypedFormArray {
    return this.navigationForm.get('navigationItems') as UntypedFormArray
  }

  ngOnInit(): void {
    this.generateForm()
    this.contentService.getNavigationLinks().subscribe(() => (this.isLoading = false))

    this.subscriptions.add(
      this.contentService.navigationLinksObservable$.subscribe((navigationItems) =>
        this.handleData(navigationItems)
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  generateForm(): void {
    Array.from({ length: 5 }).forEach(() => {
      this.navigationLinks.push(this.buildFormInput())
    })
  }

  buildFormInput(): UntypedFormGroup {
    const urlRegex = /^https?:\/\/[^\s/$.?#!<>|;'"\\@:&=_()].+\.[^\s]*[^\s.]$/
    return this.formBuilder.group(
      {
        title: ['', [Validators.maxLength(20)]],
        url: ['', [Validators.pattern(urlRegex)]],
      },
      { validators: this.fillBothValidation }
    )
  }

  fillBothValidation(formGroup: UntypedFormGroup): ValidationErrors {
    const titleMissing = !(formGroup.get('title').value || '').trim().length
    const urlMissing = !(formGroup.get('url').value || '').trim().length

    if (titleMissing && !urlMissing) {
      return { titleRequired: true }
    } else if (!titleMissing && urlMissing) {
      return { urlRequired: true }
    } else {
      return null
    }
  }

  handleData(navigationItems: INavigationLink[]): void {
    this.navigationItems = navigationItems
    this.patchForm(navigationItems)
  }

  patchForm(navigationItems: INavigationLink[]): void {
    this.navigationLinks.controls.forEach((_, index) => {
      const value = navigationItems[index] || {
        title: '',
        url: '',
      }
      this.navigationLinks.controls[index].patchValue(value)
    })
  }

  save(): void {
    this.isLoading = true
    const navigationLinks = this.navigationLinks.controls.reduce((validLinks, control) => {
      if (
        control.valid &&
        control.value.title &&
        control.value.title !== '' &&
        control.value.url !== ''
      ) {
        validLinks.push(control.value)
      }
      return validLinks
    }, [])

    this.contentService.updateNavigationLinks(navigationLinks).subscribe(
      () => {
        this.toastMessageService.openToast(SAVE_NAVIGATION_SUCCESS_CONFIG)
        this.isLoading = false
      },
      () => {
        this.toastMessageService.openToast(SAVE_NAVIGATION_ERROR_CONFIG)
        this.isLoading = false
      }
    )
  }

  discard(): void {
    this.patchForm(this.navigationItems)
  }
}
