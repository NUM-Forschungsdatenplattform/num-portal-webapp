import { Component, Input } from '@angular/core'
import { IDefinitionList } from '../../models/definition-list.interface'
import { DefinitionType } from '../../models/definition-type.enum'
import { FlexModule } from '@angular/flex-layout/flex'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { DatePipe } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
  imports: [FlexModule, FaIconComponent, DatePipe, TranslatePipe],
})
export class DefinitionListComponent {
  @Input() dataSource: IDefinitionList[]
  definitionType = DefinitionType

  constructor() {}
}
