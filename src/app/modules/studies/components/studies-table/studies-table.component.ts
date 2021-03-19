import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Params, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { StudyService } from 'src/app/core/services/study/study.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { DialogConfig } from 'src/app/shared/models/dialog/dialog-config.interface'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { StudyStatus } from 'src/app/shared/models/study/study-status.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import {
  CLOSE_STUDY_DIALOG_CONFIG,
  PUBLISH_STUDY_DIALOG_CONFIG,
  WITHDRAW_APPROVAL_DIALOG_CONFIG,
} from './constants'
import { APPROVER_MENU, COORDINATOR_MENU, MENU_ITEM_PREVIEW, StudyMenuKeys } from './menu-items'

@Component({
  selector: 'num-studies-table',
  templateUrl: './studies-table.component.html',
  styleUrls: ['./studies-table.component.scss'],
})
export class StudiesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(
    private router: Router,
    private studyService: StudyService,
    private dialogService: DialogService,
    private authService: AuthService
  ) {}

  displayedColumns: string[] = ['menu', 'id', 'name', 'status']
  dataSource = new MatTableDataSource()

  menuItems: IItemVisibility[] = []
  roles: string[] = []
  userId: string

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.subscriptions.add(
      this.studyService.studiesObservable$.subscribe((studies) => this.handleData(studies))
    )
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe((userInfo) => this.handleUserInfo(userInfo))
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(studies: IStudyApi[]): void {
    this.dataSource.data = studies
  }

  handleUserInfo(userInfo: IAuthUserInfo): void {
    this.roles = userInfo.groups
    this.userId = userInfo.sub
    this.generateMenuForRole()
  }

  generateMenuForRole(): void {
    let menu = [MENU_ITEM_PREVIEW]
    if (this.roles?.includes(AvailableRoles.StudyCoordinator)) {
      menu = [...menu, ...COORDINATOR_MENU]
    }

    if (this.roles?.includes(AvailableRoles.StudyApprover)) {
      menu = [...menu, ...APPROVER_MENU]
    }

    this.menuItems = menu
  }

  handleMenuClick(key: string, id: number): void {
    let queryParams: Params
    switch (key) {
      case StudyMenuKeys.Edit:
      case StudyMenuKeys.Preview:
      case StudyMenuKeys.Review:
        queryParams = { mode: key.toLocaleLowerCase() }
        this.router.navigate(['studies', id, 'editor'], { queryParams })
        break

      case StudyMenuKeys.Edit_researchers:
        queryParams = { mode: StudyMenuKeys.Edit.toLocaleLowerCase() }
        this.router.navigate(['studies', id, 'editor'], { queryParams })
        break

      case StudyMenuKeys.Withdraw_approval:
        this.handleWithDialog(WITHDRAW_APPROVAL_DIALOG_CONFIG, StudyStatus.Draft, id)
        break

      case StudyMenuKeys.Close:
        this.handleWithDialog(CLOSE_STUDY_DIALOG_CONFIG, StudyStatus.Closed, id)
        break

      case StudyMenuKeys.Publish:
        this.handleWithDialog(PUBLISH_STUDY_DIALOG_CONFIG, StudyStatus.Published, id)
        break
    }
  }

  handleWithDialog(dialogConfig: DialogConfig, newStatus: StudyStatus, id: number): void {
    const dialogRef = this.dialogService.openDialog(dialogConfig)
    dialogRef.afterClosed().subscribe((confirmResult) => {
      if (confirmResult === true) {
        this.studyService.updateStatusById(id, newStatus).subscribe()
      }
    })
  }
}
