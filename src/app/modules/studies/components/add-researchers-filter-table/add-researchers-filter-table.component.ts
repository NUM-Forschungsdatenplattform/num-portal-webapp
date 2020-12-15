import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { IUser } from 'src/app/shared/models/user/user.interface'

@Component({
  selector: 'num-add-researchers-filter-table',
  templateUrl: './add-researchers-filter-table.component.html',
  styleUrls: ['./add-researchers-filter-table.component.scss'],
})
export class AddResearchersFilterTableComponent implements OnInit {
  @Input() users: IUser[]
  @Input() selectedResearchers: { [id: number]: boolean } = {}
  @Output() selectedResearchersChange = new EventEmitter<{ [id: number]: boolean }>()

  dataSource = new MatTableDataSource()
  displayedColumns: string[] = ['name', 'email', 'select']

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.users
  }

  handleSelectClick(user: IUser, isSelected: boolean): void {
    this.selectedResearchers[user.id] = !isSelected
    this.selectedResearchersChange.emit(this.selectedResearchers)
  }
}
