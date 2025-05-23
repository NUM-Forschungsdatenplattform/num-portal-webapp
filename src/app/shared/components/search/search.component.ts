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
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { Subscription } from 'rxjs'
import { environment } from '../../../../environments/environment'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    FormsModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    FaIconComponent,
    MatSuffix,
    NgClass,
    ExtendedModule,
    TranslatePipe,
  ],
})
export class SearchComponent implements OnInit, OnChanges, OnDestroy {
  /* istanbul ignore next */
  private readonly debounceTime = environment.name === 'test' ? 10 : 200
  searchForm: UntypedFormGroup
  constructor() {}

  private subscriptions = new Subscription()

  @Input() label: string
  @Input() searchText: string
  @Output() searchTextChange = new EventEmitter()

  currentText = ''

  ngOnInit(): void {
    this.searchForm = new UntypedFormGroup({
      query: new UntypedFormControl(this.searchText || ''),
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
      if (Object.prototype.hasOwnProperty.call(changes, propName)) {
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
