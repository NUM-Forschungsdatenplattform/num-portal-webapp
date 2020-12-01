import { Component, OnInit } from '@angular/core'
import { AdminService } from 'src/app/core/services/admin.service'

@Component({
  selector: 'num-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUnapprovedUsers().subscribe()
  }
}
