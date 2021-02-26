import { Component, OnInit } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin/admin.service'

@Component({
  selector: 'num-unapproved-users',
  templateUrl: './unapproved-users.component.html',
  styleUrls: ['./unapproved-users.component.scss'],
})
export class UnapprovedUsersComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUnapprovedUsers().subscribe()
  }
}
