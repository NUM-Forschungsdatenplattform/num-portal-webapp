import { Component, Input } from '@angular/core'
import { AqlBuilderDialogMode } from 'src/app/shared/models/archetype-query-builder/aql-builder-dialog-mode.enum'
import { AqbSelectDestination } from '../../../../shared/models/aqb/aqb-select-destination.enum'
import { AqbUiModel } from '../../../../shared/models/aqb/aqb-ui.model'
import { NgClass } from '@angular/common'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FlexModule } from '@angular/flex-layout/flex'
import { AqlBuilderWhereGroupComponent } from '../aql-builder-where-group/aql-builder-where-group.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-aql-builder-where',
  templateUrl: './aql-builder-where.component.html',
  styleUrls: ['./aql-builder-where.component.scss'],
  imports: [
    NgClass,
    ExtendedModule,
    FaIconComponent,
    FlexModule,
    AqlBuilderWhereGroupComponent,
    TranslatePipe,
  ],
})
export class AqlBuilderWhereComponent {
  AqbSelectDestination = AqbSelectDestination
  readonly aqlBuilderDialogMode = AqlBuilderDialogMode
  constructor() {}

  @Input()
  aqbModel: AqbUiModel

  @Input()
  dialogMode: AqlBuilderDialogMode = AqlBuilderDialogMode.AqlEditor

  setDestination(): void {
    this.aqbModel.selectDestination = AqbSelectDestination.Where
  }
}
