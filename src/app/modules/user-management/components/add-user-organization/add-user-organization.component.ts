import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Subscription } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'

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

  ngOnInit(): void {
    this.subscriptions.add(
      this.organizationService.organizationsObservable$.subscribe((organizations) =>
        this.handleData(organizations)
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(organizations: IOrganization[]): void {
    this.organizations = organizations
  }

  handleSelectClick(): void {
    this.selectedOrganizationChange.emit(this.selectedOrganization)
  }
}
