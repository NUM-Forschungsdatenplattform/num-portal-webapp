import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'

@Component({
  selector: 'num-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss'],
})
export class AddUserRolesComponent implements OnInit {
  @Input() selectedRoles: string[]
  @Output() selectedRolesChange = new EventEmitter<string[]>()

  dataSource = new MatTableDataSource<string>()
  displayedColumns: string[] = ['role', 'icon']
  lookupSelectedRole: { [id: string]: boolean } = {}

  userProfile: IUserProfile

  constructor(private profileService: ProfileService) {
    this.profileService.userProfileObservable$.subscribe((user) => (this.userProfile = user))
  }

  ngOnInit(): void {
    this.handleData()
  }

  handleData(): void {
    const availableRoles = Object.values(AvailableRoles)
    if (!this.userProfile.roles.includes(AvailableRoles.SuperAdmin)) {
      this.dataSource.data = availableRoles.filter(
        (role) => role !== AvailableRoles.SuperAdmin && role !== AvailableRoles.ContentAdmin
      )
    } else {
      this.dataSource.data = Object.values(AvailableRoles)
    }
    this.selectedRoles.forEach((role) => (this.lookupSelectedRole[role] = true))
  }

  handleSelectClick(row: string): void {
    this.lookupSelectedRole[row] = true
    this.selectedRoles.push(row)
    this.selectedRolesChange.emit(this.selectedRoles)
  }

  handleDeselectClick(row: string): void {
    this.lookupSelectedRole[row] = false
    this.selectedRoles = this.selectedRoles.filter((item) => item !== row)
    this.selectedRolesChange.emit(this.selectedRoles)
  }
}
