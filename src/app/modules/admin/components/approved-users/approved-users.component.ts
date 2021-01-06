import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin.service'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'

@Component({
  selector: 'num-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.scss'],
})
export class ApprovedUsersComponent implements OnInit {
  filterConfig: IUserFilter

  constructor(private adminService: AdminService) {
    this.adminService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  ngOnInit(): void {
    this.adminService.getApprovedUsers().subscribe()
  }

  handleSearchChange(): void {
    this.adminService.setFilter(this.filterConfig)
  }
}
