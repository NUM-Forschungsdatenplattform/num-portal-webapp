import { Component } from '@angular/core'
import { OperationAdministrationComponent } from '../shared-parts/operation-administration/operation-administration.component'
import { ContactHandlingComponent } from '../shared-parts/contact-handling/contact-handling.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-contact',
  templateUrl: './contact.component.html',
  imports: [OperationAdministrationComponent, ContactHandlingComponent, TranslatePipe],
})
export class ContactComponent {
  constructor() {}
}
