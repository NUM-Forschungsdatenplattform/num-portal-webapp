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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IDetermineHits } from 'src/app/shared/components/editor-determine-hits/determine-hits.interface'
import { ICohortPreviewApi } from 'src/app/shared/models/cohort-preview.interface'

@Component({
  selector: 'num-cohort-graphs',
  templateUrl: './cohort-graphs.component.html',
  styleUrls: ['./cohort-graphs.component.scss'],
})
export class CohortGraphsComponent implements OnInit {
  @Input() determineHits: IDetermineHits
  @Input() previewData: ICohortPreviewApi
  @Output() determine = new EventEmitter<void>()

  constructor() {}

  ngOnInit(): void {}
}
