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
