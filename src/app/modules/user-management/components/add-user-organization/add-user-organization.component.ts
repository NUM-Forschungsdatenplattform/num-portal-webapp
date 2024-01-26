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

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { cloneDeep } from 'lodash-es'
import { Subscription } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'

@Component({
  selector: 'num-add-user-organization',
  templateUrl: './add-user-organization.component.html',
  styleUrls: ['./add-user-organization.component.scss'],
})
export class AddUserOrganizationComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  @Input() selectedOrganization: IOrganization
  @Output() selectedOrganizationChange = new EventEmitter<IOrganization>()

  constructor(private organizationService: OrganizationService) {}

  organizations: IOrganization[]
  organizationId: IOrganization['id']

  ngOnInit(): void {
    this.subscriptions.add(
      this.organizationService.organizationsObservable$.subscribe((organizations) =>
        this.handleData(organizations),
      ),
    )
    this.organizationId = cloneDeep(this.selectedOrganization.id)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(organizations: IOrganization[]): void {
    this.organizations = organizations
  }

  handleSelectClick(): void {
    const newOrganization = this.organizations.find(
      (organization) => organization.id === this.organizationId,
    )

    this.selectedOrganizationChange.emit(newOrganization)
  }
}
