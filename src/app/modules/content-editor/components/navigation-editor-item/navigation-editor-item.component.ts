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

import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { InputErrorStateMatcher } from './error-state-matcher'

@Component({
  selector: 'num-navigation-editor-item',
  templateUrl: './navigation-editor-item.component.html',
  styleUrls: ['./navigation-editor-item.component.scss'],
})
export class NavigationEditorItemComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor() {}

  @Input()
  index: number

  @Input()
  form: UntypedFormGroup

  @Input()
  isLoading = true

  urlErrorStateMatcher = new InputErrorStateMatcher('urlRequired')
  titleErrorStateMatcher = new InputErrorStateMatcher('titleRequired')

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.get('url').valueChanges.subscribe((value) => this.handleUrlChange(value))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleUrlChange(value: string): void {
    this.form.get('url').setValue(value.trim(), { emitEvent: false })
  }

  clearInput(): void {
    this.form.patchValue({
      title: '',
      url: '',
    })
  }
}
