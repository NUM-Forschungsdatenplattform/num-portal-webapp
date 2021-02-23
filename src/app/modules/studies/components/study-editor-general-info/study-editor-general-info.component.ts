import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips'
import { IDefinitionList } from '../../../../shared/models/definition-list.interface'
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete'
import { StudyCategories } from './study-categories.enum'
import { DateAdapter } from '@angular/material/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'num-study-editor-general-info',
  templateUrl: './study-editor-general-info.component.html',
  styleUrls: ['./study-editor-general-info.component.scss'],
})
export class StudyEditorGeneralInfoComponent implements OnInit {
  constructor(private dateAdapter: DateAdapter<any>, private translate: TranslateService) {}
  @Input() form: FormGroup
  @Input() isDisabled: boolean
  @Input() generalInfoData: IDefinitionList[]

  get keywords(): string[] {
    return this.form.get('keywords')?.value || []
  }
  set keywords(value: string[]) {
    this.form.get('keywords').setValue(value)
  }

  get categories(): StudyCategories[] {
    return this.form.get('categories')?.value || []
  }
  set categories(value: StudyCategories[]) {
    this.form.get('categories').setValue(value)
  }

  allCategories: StudyCategories[] = (Object.keys(StudyCategories).filter(
    (c) => isNaN(Number(c)) && c !== StudyCategories.NO_RESULTS
  ) as unknown) as StudyCategories[]
  filteredCategories: Observable<StudyCategories[]>
  categoryCtrl = new FormControl()
  separatorKeysCodes: number[] = [ENTER, COMMA]

  @ViewChild('categoryAutocomplete') categoryAutocomplete: MatAutocomplete
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    this.dateAdapter.setLocale('de')

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      map((filterText: string | null) =>
        filterText ? this._filterCategories(filterText) : this._filterCategories()
      )
    )
  }

  addKeyword(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value?.trim()
    const keywords = this.keywords

    if (value && !this.keywords.includes(value)) {
      keywords.push(value)
      this.keywords = keywords.slice()
    }

    if (input) input.value = ''
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword)

    if (index >= 0) this.keywords.splice(index, 1)
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
      .filter((category) => !this.categories.includes(category))
      .slice()

    let filteredCategories: StudyCategories[] = []

    if (filterText) {
      filterText = filterText.toLowerCase().trim()

      filteredCategories = allCategoriesWithoutSelected.filter(
        (category) =>
          this.translate
            .instant('STUDY.CATEGORIES.' + category)
            .toLowerCase()
            .indexOf(filterText) === 0
      )
    } else {
      filteredCategories = allCategoriesWithoutSelected
    }

    if (filteredCategories.length !== 0) return filteredCategories
    else return [StudyCategories.NO_RESULTS]
  }
}
