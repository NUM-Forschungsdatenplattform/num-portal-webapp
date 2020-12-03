import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { TranslateService } from '@ngx-translate/core'
import { IRoleUi } from 'src/app/shared/models/user/role-ui.interface'
import { availableRoles } from '../../available-roles'

@Component({
  selector: 'num-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss'],
})
export class AddUserRolesComponent implements OnInit {
  @Input() selectedRoles: string[]
  @Output() selectedRolesChange = new EventEmitter<string[]>()

  constructor(private translate: TranslateService) {}

  idOfHighlightedRow: string
  dataSource = new MatTableDataSource<IRoleUi>()
  displayedColumns: string[] = ['role', 'icon']

  roles = availableRoles
  lookupSelectedRole: { [id: string]: boolean } = {}
  currentLang: string

  ngOnInit(): void {
    this.dataSource.data = this.roles
    this.currentLang = this.translate.currentLang
  }

  handleRowClick(row: IRoleUi): void {
    this.idOfHighlightedRow = row.id
  }

  handleSelectClick(row: IRoleUi): void {
    this.lookupSelectedRole[row.id] = true
    this.selectedRoles.push(row.id)
    this.selectedRolesChange.emit(this.selectedRoles)
  }

  handleDeselectClick(row: IRoleUi): void {
    this.lookupSelectedRole[row.id] = false
    this.selectedRoles = this.selectedRoles.filter((item) => item !== row.id)
    this.selectedRolesChange.emit(this.selectedRoles)
  }
}
