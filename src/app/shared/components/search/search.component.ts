import { debounceTime } from 'rxjs/operators'
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  /* istanbul ignore next */
  private readonly debounceTime = environment.name === 'test' ? 10 : 200
  searchForm: FormGroup
  constructor() {}

  private subscriptions = new Subscription()

  @Input() label: string
  @Input() searchText: string
  @Output() searchTextChange = new EventEmitter()

  currentText = ''

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl(this.searchText || ''),
    })

    this.subscriptions.add(
      this.searchForm
        .get('query')
        .valueChanges.pipe(debounceTime(this.debounceTime))
        .subscribe((value) => {
          this.currentText = value
          this.searchTextChange.emit(value)
        })
    )
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
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
