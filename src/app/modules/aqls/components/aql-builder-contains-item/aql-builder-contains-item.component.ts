import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AqbContainsItemUiModel } from '../../../../shared/models/aqb/aqb-contains-item-ui.model'
import { MatIconButton } from '@angular/material/button'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { TranslatePipe } from '@ngx-translate/core'
import { ArchetypePipe } from '../../../../shared/pipes/archetype.pipe'

@Component({
  selector: 'num-aql-builder-contains-item',
  templateUrl: './aql-builder-contains-item.component.html',
  styleUrls: ['./aql-builder-contains-item.component.scss'],
  imports: [MatIconButton, FaIconComponent, TranslatePipe, ArchetypePipe],
})
export class AqlBuilderContainsItemComponent {
  constructor() {}

  @Input()
  item: AqbContainsItemUiModel

  @Output()
  deleteItemByArchetypeReferenceId = new EventEmitter<number>()

  deleteSelf(): void {
    this.deleteItemByArchetypeReferenceId.emit(this.item.archetypeReferenceId)
  }
}
