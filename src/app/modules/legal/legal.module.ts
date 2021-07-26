/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LegalRoutingModule } from './legal-routing.module'
import { ImprintComponent } from './components/imprint/imprint.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { ContactComponent } from './components/contact/contact.component'
import { DataProtectionComponent } from './components/data-protection/data-protection.component'
import { OperationAdministrationComponent } from './components/shared-parts/operation-administration/operation-administration.component'
import { SharedContactComponent } from './components/shared-parts/shared-contact/shared-contact.component'
import { ContactHandlingComponent } from './components/shared-parts/contact-handling/contact-handling.component'

@NgModule({
  declarations: [
    ImprintComponent,
    ContactComponent,
    DataProtectionComponent,
    OperationAdministrationComponent,
    SharedContactComponent,
    ContactHandlingComponent,
  ],
  imports: [CommonModule, LegalRoutingModule, SharedModule],
})
export class LegalModule {}
