import { Component, OnDestroy, ViewChild } from '@angular/core'
import { AqlService } from 'src/app/core/services/aql/aql.service'
import { take } from 'rxjs/operators'
import { IAqlApi } from '../../../../shared/models/aql/aql.interface'
import { lastValueFrom, Subscription } from 'rxjs'
import { MatPaginator } from '@angular/material/paginator'
import { IItemVisibility } from '../../../../shared/models/item-visibility.interface'
import { ProfileService } from '../../../../core/services/profile/profile.service'
import { IUserProfile } from '../../../../shared/models/user/user-profile.interface'
import { Router } from '@angular/router'
import { AqlMenuKeys, MENU_ITEM_CLONE, MENU_ITEM_DELETE, MENU_ITEM_EDIT } from './menu-item'
import { DialogConfig } from '../../../../shared/models/dialog/dialog-config.interface'
import { DialogService } from '../../../../core/services/dialog/dialog.service'
import { DELETE_APPROVAL_DIALOG_CONFIG } from './constants'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { ToastMessageType } from 'src/app/shared/models/toast-message-type.enum'
import { AqlTableColumns } from 'src/app/shared/models/aql/aql-table.interface'
import { SortableTable } from 'src/app/shared/models/sortable-table.model'
import { TranslateService, TranslatePipe } from '@ngx-translate/core'
import { IAqlCategoryIdNameMap } from 'src/app/shared/models/aql/category/aql-category-id-name-map.interface'
import { Sort, MatSort, MatSortHeader } from '@angular/material/sort'
import { FlexModule } from '@angular/flex-layout/flex'
import { FilterChipsComponent } from '../../../../shared/components/filter-chips/filter-chips.component'
import { SearchComponent } from '../../../../shared/components/search/search.component'
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table'
import { MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatIconButton } from '@angular/material/button'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatTooltip } from '@angular/material/tooltip'
import { AqlMenuPipe } from '../../../../shared/pipes/aql-menu.pipe'
import { LocalizedDatePipe } from '../../../../shared/pipes/localized-date.pipe'

@Component({
  selector: 'num-aql-table',
  templateUrl: './aql-table.component.html',
  styleUrls: ['./aql-table.component.scss'],
  imports: [
    FlexModule,
    FilterChipsComponent,
    SearchComponent,
    MatTable,
    MatSort,
    MatMenu,
    MatMenuContent,
    MatMenuItem,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatMenuTrigger,
    FaIconComponent,
    MatSortHeader,
    MatTooltip,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatPaginator,
    TranslatePipe,
    AqlMenuPipe,
    LocalizedDatePipe,
  ],
})
export class AqlTableComponent extends SortableTable<IAqlApi> implements OnDestroy {
  user: IUserProfile
  displayedColumns: AqlTableColumns[] = [
    'menu',
    'name',
    'author',
    'creationDate',
    'isPublic',
    'organization',
    'category',
  ]
  lang = 'en'
  menuItems: IItemVisibility[] = [MENU_ITEM_CLONE, MENU_ITEM_EDIT, MENU_ITEM_DELETE]
  filterConfig: any
  selectedItem = 'QUERIES.ALL_AQLS'
  aqlCategories: IAqlCategoryIdNameMap = {}
  private subscriptions = new Subscription()

  public sortBy: string
  public sortDir: string

  public pageIndex: number

  public totalItems: number

  public filters: any

  @ViewChild(MatPaginator) paginator: MatPaginator

  get pageSize(): number {
    return +localStorage.getItem('pageSize') || 5
  }

  set pageSize(pageSize) {
    localStorage.setItem('pageSize', pageSize.toString())
  }

  constructor(
    private aqlService: AqlService,
    private profileService: ProfileService,
    private dialogService: DialogService,
    private router: Router,
    private toast: ToastMessageService,
    private translateService: TranslateService
  ) {
    super()

    this.pageIndex = 0
    this.filters = {
      type: null,
      search: null,
    }

    this.sortBy = 'name'
    this.sortDir = 'ASC'

    this.aqlService.filterConfigObservable$.pipe(take(1)).subscribe((config) => {
      this.filterConfig = config
      this.handleSearchChange(true)
      this.handleSearchChange(true)

      this.getAll(true)
    })

    this.subscriptions.add(
      this.profileService.userProfileObservable$.subscribe((user) => (this.user = user))
    )

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((event) => {
        this.lang = event.lang || 'en'

        if (this.lang === 'en' && this.sortBy === 'name') {
          this.sortBy = 'nameTranslated'
        }

        if (this.lang === 'de' && this.sortBy === 'nameTranslated') {
          this.sortBy = 'name'
        }

        this.getAll()
      })
    )

    this.lang = this.translateService.currentLang || 'en'
  }

  handleSortChangeTable(sort: Sort): void {
    this.sortBy = sort.active
    this.sortDir = sort.direction.toUpperCase()

    if (this.sortBy === 'creationDate') {
      this.sortBy = 'createDate'
    }

    if (this.lang === 'en' && this.sortBy === 'name') {
      this.sortBy = 'nameTranslated'
    }

    this.getAll()
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.getAll()
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
      this.aqlService
        .getAllPag(
          this.pageIndex,
          this.pageSize,
          this.sortDir,
          this.sortBy,
          this.filters,
          this.lang
        )
        .subscribe((data) => {
          this.handleData(data)
        })
    )
  }

  handleFilterChange(): void {
    this.aqlService.setFilter(this.filterConfig)
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

  getCategory() {}

  handleData(projects: any): void {
    this.dataSource.data = projects.content
    this.totalItems = projects.totalElements
  }

  handleChangeFilter(noGet = false): void {
    for (let i = 0; i < this.filterConfig.filterItem.length; i++) {
      if (this.filterConfig.filterItem[i].isSelected) {
        switch (this.filterConfig.filterItem[i].id) {
          case 'QUERIES.ALL_AQLS':
            this.filters.type = null
            break
          case 'QUERIES.MY_AQL':
            this.filters.type = 'OWNED'
            break
          case 'QUERIES.ORGANIZATION_AQLS':
            this.filters.type = 'ORGANIZATION'
            break
          default:
        }
      }
    }

    if (!noGet) {
      this.getAll(true)
    }
  }

  handleMenuClick(key: string, id: number): void {
    switch (key) {
      case AqlMenuKeys.Edit:
      case AqlMenuKeys.Clone:
        this.router.navigate(['aqls', id, 'editor'])
        break
      case AqlMenuKeys.Delete:
        this.handleWithDialog(DELETE_APPROVAL_DIALOG_CONFIG, id)
        break
    }
  }

  handleWithDialog(dialogConfig: DialogConfig, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.delete(id).then(() => {
          this.aqlService.getAll().subscribe()
        })
      }
    })
  }

  async delete(id: number): Promise<void> {
    try {
      await lastValueFrom(this.aqlService.delete(id))

      this.getAll()

      this.toast.openToast({
        type: ToastMessageType.Success,
        message: 'QUERIES.DELETE_QUERY_SUCCESS_MESSAGE',
      })
    } catch (_) {
      this.toast.openToast({
        type: ToastMessageType.Error,
        message: 'QUERIES.DELETE_QUERY_ERROR_MESSAGE',
      })
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
