import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { IRoleI18n } from 'src/app/shared/models/admin/role.interface'
import { available_roles } from '../../available_roles'

@Component({
  selector: 'num-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss'],
})
export class AddUserRolesComponent implements OnInit {
  @Input() selectedRoles: string[]
  @Output() selectedRolesChange = new EventEmitter<string[]>()
  constructor() {}

  nameOfHighlightedRow: string
  dataSource = new MatTableDataSource<IRoleI18n>()
  displayedColumns: string[] = ['role', 'icon']

  // roles: string[] = ['ROLE.RESEARCHER', 'ROLE.STUDY_COORDINATOR', 'ROLE.ORGANIZATION_ADMIN']
  roles = available_roles
  lookupSelectedRole: { [name: string]: boolean } = {}

  ngOnInit(): void {
    this.dataSource.data = this.roles
  }

  handleRowClick(row: string): void {
    this.nameOfHighlightedRow = row
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
