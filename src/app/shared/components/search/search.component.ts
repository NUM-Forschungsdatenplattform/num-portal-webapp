import { debounceTime } from 'rxjs/operators'
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges {
  searchForm: FormGroup
  constructor() {}

  @Input() searchText: string
  @Output() searchTextChange = new EventEmitter()

  currentText = ''

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl(this.searchText || ''),
    })

    this.searchForm
      .get('query')
      .valueChanges.pipe(debounceTime(200))
      .subscribe((value) => {
        this.currentText = value
        this.searchTextChange.emit(value)
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName]
        switch (propName) {
          case 'searchText': {
            if (!change.isFirstChange() && this.currentText !== change.currentValue) {
              this.patchInput(change.currentValue)
            }
          }
        }
      }
    }
  }

  patchInput(value: string): void {
    if (this.searchForm.value.query !== undefined) {
      this.searchForm.patchValue({
        query: value,
      })
    }
  }

  clearInput(): void {
    this.patchInput('')
  }
}
