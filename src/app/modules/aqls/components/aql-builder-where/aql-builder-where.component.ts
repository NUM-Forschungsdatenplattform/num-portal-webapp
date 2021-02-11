import { Component, Input, OnInit } from '@angular/core'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { AqbSelectDestination } from '../../models/aqb/aqb-select-destination.enum'
import { AqbUiModel } from '../../models/aqb/aqb-ui.model'

@Component({
  selector: 'num-aql-builder-where',
  templateUrl: './aql-builder-where.component.html',
  styleUrls: ['./aql-builder-where.component.scss'],
})
export class AqlBuilderWhereComponent implements OnInit {
  readonly aqlBuilderDialogMode = AqlBuilderDialogMode
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  @Input()
  dialogMode: AqlBuilderDialogMode = AqlBuilderDialogMode.AqlEditor

  ngOnInit(): void {}

  setDestination(): void {
    this.aqbModel.selectDestination = AqbSelectDestination.Where
  }
}
