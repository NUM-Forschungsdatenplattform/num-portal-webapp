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
import { ContentService } from 'src/app/core/services/content/content.service'

@Component({
  selector: 'num-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()
  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.contentService.getMetrics().subscribe())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
