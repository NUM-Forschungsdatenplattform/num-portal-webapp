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

import { debounceTime } from 'rxjs/operators'
import {
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AppConfigService } from '../../../config/app-config.service'


@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private appConfig: AppConfigService) {}

  /* istanbul ignore next */
  private readonly debounceTime = this.appConfig.name === 'test' ? 10 : 200
  searchForm: FormGroup

  private subscriptions = new Subscription()

  @Input() label: string
  @Input() searchText: string
  @Output() searchTextChange = new EventEmitter()

  currentText = ''

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl(this.searchText || ''),
    })

    this.subscriptions.add(
      this.searchForm
        .get('query')
        .valueChanges.pipe(debounceTime(this.debounceTime))
        .subscribe((value) => {
          this.currentText = value
          this.searchTextChange.emit(value)
        })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, propName)) {
        const change = changes[propName]
        switch (propName) {
          case 'searchText': {
            if (!change.isFirstChange() && this.currentText !== change.currentValue) {
              this.patchInput(change.currentValue)
            }
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  patchInput(value: string): void {
    if (this.searchForm.value.query !== undefined) {
      this.searchForm.patchValue({
        query: value,
      })
    }
  }

  clearInput(): void {
    this.patchInput('')
  }
}
