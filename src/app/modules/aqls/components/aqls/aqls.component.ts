import { Component } from '@angular/core'
import { AqlTableComponent } from '../aql-table/aql-table.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-aqls',
  templateUrl: './aqls.component.html',
  styleUrls: ['./aqls.component.scss'],
  imports: [AqlTableComponent, TranslatePipe],
})
export class AqlsComponent {
  constructor() {}
}
