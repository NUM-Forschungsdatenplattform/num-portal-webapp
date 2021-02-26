import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AqbSelectItemUiModel } from '../../models/aqb/aqb-select-item-ui.model'

@Component({
  selector: 'num-aql-builder-select-item',
  templateUrl: './aql-builder-select-item.component.html',
  styleUrls: ['./aql-builder-select-item.component.scss'],
})
export class AqlBuilderSelectItemComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor() {}

  @Input()
  item: AqbSelectItemUiModel

  @Output()
  deleteItem = new EventEmitter()

  aliasForm: FormGroup

  ngOnInit(): void {
    this.aliasForm = new FormGroup({
      value: new FormControl(this.item.givenName),
    })

    this.subscriptions.add(
      this.aliasForm.get('value').valueChanges.subscribe((value) => this.handleAliasChange(value))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleAliasChange(value: string): void {
    const pattern = new RegExp('^[a-zA-Z][0-9a-zA-Z_]*$')

    const isValid = pattern.test(value) || !value.length
    const newValue = isValid ? value : this.item.givenName

    if (newValue !== value) {
      this.patchValue(newValue)
    } else {
      this.item.givenName = newValue
    }
  }

  patchValue(value): void {
    this.aliasForm.patchValue({
      value,
    })
  }

  deleteSelf(): void {
    this.deleteItem.emit()
  }
}
