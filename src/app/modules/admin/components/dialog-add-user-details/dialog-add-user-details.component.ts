import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin.service'
import { OrganizationService } from 'src/app/core/services/organization.service'
import { IOrganizationFilter } from 'src/app/shared/models/user/organization-filter.interface'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { IUser } from 'src/app/shared/models/user/user.interface'

@Component({
  selector: 'num-dialog-add-user-details',
  templateUrl: './dialog-add-user-details.component.html',
  styleUrls: ['./dialog-add-user-details.component.scss'],
})
export class DialogAddUserDetailsComponent implements OnInit {
  @Output() closeDialog = new EventEmitter()
  dialogInput: IUser
  userDetails: IUser
  roles: string[] = []
  organization: IOrganization = {
    id: '',
  }
  filterConfig: IOrganizationFilter

  constructor(
    private adminService: AdminService,
    private organizationService: OrganizationService
  ) {
    this.organizationService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  ngOnInit(): void {
    this.userDetails = this.dialogInput
    this.organizationService.getAll().subscribe()
  }

  handleDialogConfirm(): void {
    this.roles.forEach((role) => {
      this.adminService.addUserRoles(this.dialogInput.id, role).subscribe()
    })

    this.adminService.addUserOrganization(this.dialogInput.id, this.organization).subscribe()
    this.closeDialog.emit()
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  handleSearchChange(): void {
    this.organizationService.setFilter(this.filterConfig)
  }
}
