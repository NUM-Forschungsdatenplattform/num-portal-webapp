import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IEnumItem } from 'src/app/shared/models/enum-item.interface'

@Component({
  selector: 'num-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss'],
})
export class AddUserRolesComponent implements OnInit {
  readonly roles: IEnumItem<string>[] = Object.keys(AvailableRoles).map((key) => ({
    id: key,
    name: AvailableRoles[key],
  }))

  @Input() selectedRoles: string[]
  @Output() selectedRolesChange = new EventEmitter<string[]>()

  dataSource = new MatTableDataSource<IEnumItem<string>>()
  displayedColumns: string[] = ['role', 'icon']
  lookupSelectedRole: { [id: string]: boolean } = {}

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.roles
  }

  handleSelectClick(row: IEnumItem<string>): void {
    this.lookupSelectedRole[row.id] = true
    this.selectedRoles.push(row.id)
    this.selectedRolesChange.emit(this.selectedRoles)
  }

  handleDeselectClick(row: IEnumItem<string>): void {
    this.lookupSelectedRole[row.id] = false
    this.selectedRoles = this.selectedRoles.filter((item) => item !== row.id)
    this.selectedRolesChange.emit(this.selectedRoles)
  }
}
