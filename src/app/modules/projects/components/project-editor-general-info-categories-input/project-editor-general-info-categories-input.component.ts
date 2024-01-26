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

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ProjectCategory } from '../../models/project-category.enum'

@Component({
  selector: 'num-project-editor-general-info-categories-input',
  templateUrl: './project-editor-general-info-categories-input.component.html',
  styleUrls: ['./project-editor-general-info-categories-input.component.scss'],
})
export class ProjectEditorGeneralInfoCategoriesInputComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  @Input() form: UntypedFormGroup
  @ViewChild('categoryAutocomplete') categoryAutocomplete: MatAutocomplete
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>

  get categories(): ProjectCategory[] {
    return this.form?.get('categories')?.value || []
  }
  set categories(value: ProjectCategory[]) {
    this.form?.get('categories')?.setValue(value)
  }

  allCategories = Object.values(ProjectCategory) as ProjectCategory[]
  filteredCategories: Observable<ProjectCategory[]>
  categoryCtrl = new UntypedFormControl()
  isNoResults: boolean

  ngOnInit(): void {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      map((filterText: string | null) =>
        filterText ? this.filterCategories(filterText) : this.filterCategories(),
      ),
    )
  }

  addCategory(event: MatAutocompleteSelectedEvent, trigger: MatAutocompleteTrigger): void {
    const categories = this.categories

    categories.push(event.option.value)
    this.categories = categories.slice()

    this.categoryInput.nativeElement.value = ''
    this.categoryCtrl.setValue(null)

    requestAnimationFrame(() => {
      trigger.openPanel()
    })
  }

  removeCategory(i: number): void {
    if (i >= 0) {
      this.categories.splice(i, 1)
    }

    this.categoryCtrl.setValue(null)
  }

  openCategoryAutocomplete(): void {
    if (!this.categoryAutocomplete.isOpen && !this.categoryCtrl.value) {
      this.categoryCtrl.setValue(null)
    }
  }

  filterCategories(filterText?: string): ProjectCategory[] {
    const allCategoriesWithoutSelected = this.allCategories.filter(
      (c) => !this.categories.includes(c),
    )

    let filteredCategories: ProjectCategory[] = []

    if (filterText) {
      filterText = filterText.toLowerCase().trim()

      filteredCategories = allCategoriesWithoutSelected.filter((category) =>
        this.translate
          .instant('PROJECT.CATEGORIES.' + category)
          .toLowerCase()
          .includes(filterText),
      )
    } else {
      filteredCategories = allCategoriesWithoutSelected
    }

    this.isNoResults = filteredCategories.length === 0

    return filteredCategories
  }
}
