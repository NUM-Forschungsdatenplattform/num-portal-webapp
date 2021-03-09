import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { StudyCategory } from '../../models/study-category.enum'

@Component({
  selector: 'num-study-editor-general-info-categories-input',
  templateUrl: './study-editor-general-info-categories-input.component.html',
  styleUrls: ['./study-editor-general-info-categories-input.component.scss'],
})
export class StudyEditorGeneralInfoCategoriesInputComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  @Input() form: FormGroup
  @ViewChild('categoryAutocomplete') categoryAutocomplete: MatAutocomplete
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>

  get categories(): StudyCategory[] {
    return this.form?.get('categories')?.value || []
  }
  set categories(value: StudyCategory[]) {
    this.form?.get('categories')?.setValue(value)
  }

  allCategories = Object.values(StudyCategory) as StudyCategory[]
  filteredCategories: Observable<StudyCategory[]>
  categoryCtrl = new FormControl()
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

  filterCategories(filterText?: string): StudyCategory[] {
    const allCategoriesWithoutSelected = this.allCategories.filter(
      (c) => !this.categories.includes(c)
    )

    let filteredCategories: StudyCategory[] = []

    if (filterText) {
      filterText = filterText.toLowerCase().trim()

      filteredCategories = allCategoriesWithoutSelected.filter((category) =>
        this.translate
          .instant('STUDY.CATEGORIES.' + category)
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
