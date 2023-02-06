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

import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core'
import { IDetermineHits } from './determine-hits.interface'

@Component({
  selector: 'num-editor-determine-hits',
  templateUrl: './editor-determine-hits.component.html',
  styleUrls: ['./editor-determine-hits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDetermineHitsComponent {
  @Input() isButtonDisabled: boolean
  @Input() content: IDetermineHits
  @Input() isCohortValid: any
  @Output() clicked = new EventEmitter()

  constructor() {}

  determineHits(): void {
    this.clicked.emit()
  }
}
