import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'
import { IGenericDialog } from 'src/app/shared/models/generic-dialog.interface'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'

@Component({
  templateUrl: './dialog-add-researchers.component.html',
  styleUrls: ['./dialog-add-researchers.component.scss'],
})
export class DialogAddResearchersComponent implements OnInit, OnDestroy, IGenericDialog<IUser[]> {
  private subscriptions = new Subscription()

  dialogInput: IUser[]
  @Output() closeDialog = new EventEmitter<IUser[]>()

  dataSource = new MatTableDataSource<IUser>()

  selectedResearchers: IUser[] = []
  filterConfig: IUserFilter

  columnPaths = [['firstName'], ['lastName'], ['organization', 'name'], ['select']]
  columnKeys = ['firstName', 'lastName', 'info', 'isSelected']

  public sortBy: string
  public sortDir: string

  public pageIndex: number
  public totalItems: number

  public filters: any

  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize: number) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public dialogConfig: DialogConfig
  ) {}

  ngOnInit(): void {
    this.setLastFilter()

    if (this.dialogConfig.dialogContentPayload && this.dialogConfig.dialogContentPayload.length) {
      this.selectedResearchers = this.dialogConfig.dialogContentPayload
    }

    this.pageIndex = 0
    this.filters = {
      approved: true,
      search: null,
      roles: 'RESEARCHER',
      enabled: true,
    }

    this.sortBy = 'firstName'
    this.sortDir = 'ASC'

    this.getAll()
  }

  setLastFilter(): void {
    this.adminService.filterConfigObservable$
      .pipe(take(1))
      .subscribe((config) => (this.filterConfig = config))
  }

  goToFirstPage() {
    this.paginator.firstPage()
    this.pageIndex = 0
  }

  getAll(returnFirstIndex = false) {
    if (returnFirstIndex && typeof this.paginator !== 'undefined') {
      this.goToFirstPage()
    }

    this.subscriptions.add(
      this.adminService
        .getAllPag(this.pageIndex, this.pageSize, this.sortDir, this.sortBy, this.filters)
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  handleFilterChange(noGet = false): void {
    if (this.filterConfig.filterItem[1].isSelected) {
      this.filters.type = 'ORGANIZATION'
    } else {
      this.filters.type = null
    }
    if (this.filterConfig.filterItem[3].isSelected) {
      this.filters.enabled = false
    } else {
      this.filters.enabled = true
    }

    if (!noGet) {
      this.getAll(true)
    }
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
  }

  handleData(users: any): void {
    this.dataSource.data = users.content
    this.totalItems = users.totalElements
  }

  handleSearchChange(noGet = false): void {
    if (typeof this.paginator !== 'undefined') {
      this.goToFirstPage()
    }
    if (this.filterConfig.searchText === '') {
      this.filters.search = null
    } else {
      this.filters.search = this.filterConfig.searchText
    }

    if (!noGet) {
      this.getAll()
    }
  }

  handleDialogConfirm(): void {
    this.closeDialog.emit(this.selectedResearchers)
  }

  handleDialogCancel(): void {
    this.closeDialog.emit()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
