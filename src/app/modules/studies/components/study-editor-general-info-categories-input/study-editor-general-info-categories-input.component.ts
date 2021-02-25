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
import { StudyCategories } from './study-categories.enum'

@Component({
  selector: 'num-study-editor-general-info-categories-input',
  templateUrl: './study-editor-general-info-categories-input.component.html',
  styleUrls: ['./study-editor-general-info-categories-input.component.scss'],
})
export class StudyEditorGeneralInfoCategoriesInputComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  @Input() form: FormGroup

  get categories(): StudyCategories[] {
    return this.form.get('categories')?.value || []
  }
  set categories(value: StudyCategories[]) {
    this.form.get('categories').setValue(value)
  }

  allCategories = Object.keys(StudyCategories) as StudyCategories[]
  filteredCategories: Observable<StudyCategories[]>
  categoryCtrl = new FormControl()

  @ViewChild('categoryAutocomplete') categoryAutocomplete: MatAutocomplete
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      map((filterText: string | null) =>
        filterText ? this._filterCategories(filterText) : this._filterCategories()
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

  removeCategory(category: StudyCategories): void {
    const index = this.categories.indexOf(category)

    if (index >= 0) this.categories.splice(index, 1)
    this.categoryCtrl.setValue(null)
  }

  openCategoryAutocomplete(): void {
    if (!this.categoryAutocomplete.isOpen && !this.categoryCtrl.value) {
      this.categoryCtrl.setValue(null)
    }
  }

  private _filterCategories(filterText?: string): StudyCategories[] {
    const allCategoriesWithoutSelected = this.allCategories
      .filter((c) => !this.categories.includes(c) && c !== StudyCategories.NO_RESULTS)
      .slice()

    let filteredCategories: StudyCategories[] = []

    if (filterText) {
      filterText = filterText.toLowerCase().trim()

      filteredCategories = allCategoriesWithoutSelected.filter(
        (category) =>
          this.translate
            .instant('STUDY.CATEGORIES.' + category)
            .toLowerCase()
            .indexOf(filterText) !== -1
      )
    } else {
      filteredCategories = allCategoriesWithoutSelected
    }

    if (filteredCategories.length !== 0) return filteredCategories
    else return [StudyCategories.NO_RESULTS]
  }
}
