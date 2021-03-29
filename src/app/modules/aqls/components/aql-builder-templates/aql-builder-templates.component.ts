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

import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IAqbSelectClick } from '../../models/aqb/aqb-select-click.interface'

@Component({
  selector: 'num-aql-builder-templates',
  templateUrl: './aql-builder-templates.component.html',
  styleUrls: ['./aql-builder-templates.component.scss'],
})
export class AqlBuilderTemplatesComponent implements OnInit, AfterViewChecked {
  constructor() {}

  @Input()
  templates: string[]

  @Input()
  selectedTemplates: FormControl

  @Output()
  selectedItem = new EventEmitter<IAqbSelectClick>()

  isViewRendered = false

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.isViewRendered = true
    }, 0)
  }
}
