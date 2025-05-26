import { Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-contact-handling',
  templateUrl: './contact-handling.component.html',
  imports: [TranslatePipe],
})
export class ContactHandlingComponent {
  constructor() {}
}
