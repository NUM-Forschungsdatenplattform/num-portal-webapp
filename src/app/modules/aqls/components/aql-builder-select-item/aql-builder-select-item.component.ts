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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AqbSelectItemUiModel } from '../../../../shared/models/aqb/aqb-select-item-ui.model'

@Component({
  selector: 'num-aql-builder-select-item',
  templateUrl: './aql-builder-select-item.component.html',
  styleUrls: ['./aql-builder-select-item.component.scss'],
})
export class AqlBuilderSelectItemComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor() {}

  @Input()
  item: AqbSelectItemUiModel

  @Output()
  deleteItem = new EventEmitter()

  aliasForm: UntypedFormGroup

  ngOnInit(): void {
    this.aliasForm = new UntypedFormGroup({
      value: new UntypedFormControl(this.item.givenName),
    })

    this.subscriptions.add(
      this.aliasForm.get('value').valueChanges.subscribe((value) => this.handleAliasChange(value))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleAliasChange(value: string): void {
    const pattern = new RegExp('^[a-zA-Z][0-9a-zA-Z_]*$')

    const isValid = pattern.test(value) || !value.length
    const newValue = isValid ? value : this.item.givenName

    if (newValue !== value) {
      this.patchValue(newValue)
    } else {
      this.item.givenName = newValue
    }
  }

  patchValue(value): void {
    this.aliasForm.patchValue({
      value,
    })
  }

  deleteSelf(): void {
    this.deleteItem.emit()
  }
}
