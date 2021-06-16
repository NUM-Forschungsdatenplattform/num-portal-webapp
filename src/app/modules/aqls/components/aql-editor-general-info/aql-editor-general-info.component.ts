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

import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'num-aql-editor-general-info',
  templateUrl: './aql-editor-general-info.component.html',
  styleUrls: ['./aql-editor-general-info.component.scss'],
})
export class AqlEditorGeneralInfoComponent implements OnInit {
  // TODO: Replace with IAqlCategoryApi
  @Input() availableCategories: { id: number; name: { de: string; en: string } }[]
  @Input() form: FormGroup
  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  categoryValueAccessor(category: { id: number; name: { de: string; en: string } } | null): string {
    if (!category) {
      return this.translateService.instant('AQL_CATEGORIES.UNCATEGORIZED')
    } else {
      return category.name[this.translateService.currentLang || 'en']
    }
  }

  compareValue(
    option: { id: number; name: { de: string; en: string } } | null,
    value: { id: number; name: { de: string; en: string } } | null
  ): boolean {
    if (!option && !value) {
      return true
    } else if (!!option && !!value) {
      return option.id === value.id
    } else {
      return false
    }
  }
}
