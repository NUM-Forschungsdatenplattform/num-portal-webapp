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
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-imprint',
  templateUrl: './imprint.component.html',
})
export class ImprintComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor() {}
  profs: string[] = []

  ngOnInit(): void {
    this.profs = ['IMPRINT.TEXTS.PROFS']
    // this.subscriptions.add(
      // this.translateService.onLangChange.subscribe((newLang) => {
        this.profs = ['IMPRINT.TEXTS.PROFS']
      // })
    // )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
