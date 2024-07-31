import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms'
import {
  MatLegacyAutocomplete as MatAutocomplete,
  MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent,
  MatLegacyAutocompleteTrigger as MatAutocompleteTrigger,
} from '@angular/material/legacy-autocomplete'
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
        filterText ? this.filterCategories(filterText) : this.filterCategories()
      )
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
      (c) => !this.categories.includes(c)
    )

    let filteredCategories: ProjectCategory[] = []

    if (filterText) {
      filterText = filterText.toLowerCase().trim()

      filteredCategories = allCategoriesWithoutSelected.filter((category) =>
        this.translate
          .instant('PROJECT.CATEGORIES.' + category)
          .toLowerCase()
          .includes(filterText)
      )
    } else {
      filteredCategories = allCategoriesWithoutSelected
    }

    this.isNoResults = filteredCategories.length === 0

    return filteredCategories
  }
}
