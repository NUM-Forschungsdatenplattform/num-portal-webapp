import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { filter, map, take } from 'rxjs/operators'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'

@Component({
  selector: 'num-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss'],
})
export class AddUserRolesComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  @Input() selectedRoles: string[]
  @Output() selectedRolesChange = new EventEmitter<string[]>()

  dataSource = new MatTableDataSource<string>()
  displayedColumns: string[] = ['role', 'icon']
  lookupSelectedRole: { [id: string]: boolean } = {}

  userProfile: IUserProfile

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.profileService.userProfileObservable$
        .pipe(
          filter((profile) => profile.id !== undefined),
          take(1),
          map((profile: IUserProfile) => {
            this.userProfile = profile
            this.handleData()
          })
        )
        .subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(): void {
    const availableRoles = Object.values(AvailableRoles)
    if (!this.userProfile.roles.includes(AvailableRoles.SuperAdmin)) {
      this.dataSource.data = availableRoles.filter(
        (role) =>
          role !== AvailableRoles.SuperAdmin &&
          role !== AvailableRoles.ContentAdmin &&
          role !== AvailableRoles.Manager &&
          role !== AvailableRoles.StudyApprover &&
          role !== AvailableRoles.CriteriaEditor
      )
    } else {
      this.dataSource.data = availableRoles
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
