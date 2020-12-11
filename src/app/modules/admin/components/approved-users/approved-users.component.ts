import { Component, OnInit } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'

@Component({
  selector: 'num-approved-users',
  templateUrl: './approved-users.component.html',
  styleUrls: ['./approved-users.component.scss'],
})
export class ApprovedUsersComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getApprovedUsers().subscribe()
  }
}
