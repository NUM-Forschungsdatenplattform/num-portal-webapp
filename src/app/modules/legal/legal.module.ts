import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LegalRoutingModule } from './legal-routing.module'
import { ImprintComponent } from './components/imprint/imprint.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { ContactComponent } from './components/contact/contact.component'
import { DataProtectionComponent } from './components/data-protection/data-protection.component'
import { OperationAdministrationComponent } from './components/shared-parts/operation-administration/operation-administration.component'
import { ContactHandlingComponent } from './components/shared-parts/contact-handling/contact-handling.component'

@NgModule({
  declarations: [
    ImprintComponent,
    ContactComponent,
    DataProtectionComponent,
    OperationAdministrationComponent,
    ContactHandlingComponent,
  ],
  imports: [CommonModule, LegalRoutingModule, SharedModule],
})
export class LegalModule {}
