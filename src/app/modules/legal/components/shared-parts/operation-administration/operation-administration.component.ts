import { Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-operation-administration',
  templateUrl: './operation-administration.component.html',
  imports: [TranslatePipe],
})
export class OperationAdministrationComponent {
  constructor() {}
}
