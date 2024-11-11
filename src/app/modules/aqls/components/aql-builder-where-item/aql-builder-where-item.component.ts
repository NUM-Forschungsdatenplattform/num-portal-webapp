import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { AqbWhereItemUiModel } from '../../../../shared/models/aqb/aqb-where-item-ui.model'
import { AqlParameterValueType } from '../../../../shared/models/aql/aql-parameter-value-type.enum'

@Component({
  selector: 'num-aql-builder-where-item',
  templateUrl: './aql-builder-where-item.component.html',
  styleUrls: ['./aql-builder-where-item.component.scss'],
})
export class AqlBuilderWhereItemComponent implements OnInit, OnDestroy {
  readonly aqlBuilderDialogMode = AqlBuilderDialogMode
  private subscriptions = new Subscription()
  AqlParameterValueType = AqlParameterValueType
  constructor() {}

  @Input()
  item: AqbWhereItemUiModel

  @Input()
  dialogMode: AqlBuilderDialogMode = AqlBuilderDialogMode.Criteria

  @Output()
  deleteItem = new EventEmitter<string>()

  parameterForm: UntypedFormGroup

  ngOnInit(): void {
    this.parameterForm = new UntypedFormGroup({
      value: new UntypedFormControl(this.item.parameterName, [Validators.required]),
    })

    this.subscriptions.add(
      this.parameterForm
        .get('value')
        .valueChanges.subscribe((value) => this.handleParameterChange(value))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleParameterChange(value: string): void {
    const pattern = new RegExp('^[0-9a-zA-Z_]+$')
    let newValue = (value || '').replace(' ', '')
    const isValid = pattern.test(newValue) || !newValue.length
    newValue = isValid ? newValue : this.item.parameterName

    if (newValue !== value) {
      this.patchParameter(newValue)
    } else {
      this.item.parameterName = newValue
    }
  }

  patchParameter(value): void {
    this.parameterForm.patchValue({
      value,
    })
  }

  deleteSelf(): void {
    this.deleteItem.emit()
  }
}
