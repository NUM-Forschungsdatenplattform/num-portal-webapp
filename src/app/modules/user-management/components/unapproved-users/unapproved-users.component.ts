import { Component } from '@angular/core'
import { UnapprovedUsersTableComponent } from '../unapproved-users-table/unapproved-users-table.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-unapproved-users',
  templateUrl: './unapproved-users.component.html',
  styleUrls: ['./unapproved-users.component.scss'],
  imports: [UnapprovedUsersTableComponent, TranslatePipe],
})
export class UnapprovedUsersComponent {
  constructor() {}
}
