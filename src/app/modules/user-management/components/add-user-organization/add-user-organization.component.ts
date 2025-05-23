import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { cloneDeep } from 'lodash-es'
import { Subscription } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatSelect, MatOption } from '@angular/material/select'
import { TranslatePipe } from '@ngx-translate/core'
import { ObjectToArrayPipe } from '../../../../shared/pipes/object-to-array.pipe'

@Component({
  selector: 'num-add-user-organization',
  templateUrl: './add-user-organization.component.html',
  styleUrls: ['./add-user-organization.component.scss'],
  imports: [MatFormField, MatLabel, MatSelect, MatOption, TranslatePipe, ObjectToArrayPipe],
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
        this.handleData(organizations)
      )
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
      (organization) => organization.id === this.organizationId
    )

    this.selectedOrganizationChange.emit(newOrganization)
  }
}
