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

import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'

@Component({
  selector: 'num-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.scss'],
})
export class OrganizationManagementComponent implements OnInit {
  availableRoles = AvailableRoles
  constructor(private organizationService: OrganizationService, private router: Router) {}

  ngOnInit(): void {
    this.organizationService.getAll().subscribe()
  }

  createOrganization(): void {
    this.router.navigate(['organizations/new/editor'])
  }
}
