import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { StudyService } from 'src/app/core/services/study.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IItemVisibility } from 'src/app/shared/models/item-visibility.interface'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'
import { APPROVER_MENU, COORDINATOR_MENU, MENU_ITEM_PREVIEW, StudyMenuKeys } from './menu-items'

@Component({
  selector: 'num-studies-table',
  templateUrl: './studies-table.component.html',
  styleUrls: ['./studies-table.component.scss'],
})
export class StudiesTableComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private studyService: StudyService, private router: Router) {}

  displayedColumns: string[] = ['menu', 'id', 'name', 'description']
  dataSource = new MatTableDataSource()

  menuItems: IItemVisibility[] = []

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.subscriptions.add(
      this.studyService.studiesObservable$.subscribe((studies) => this.handleData(studies))
    )

    this.generateMenuForRole()
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

  generateMenuForRole(): void {
    // TODO: Get roles from new auth service
    const roles = [AvailableRoles.Study_coordinator, AvailableRoles.Researcher]
    let menu = [MENU_ITEM_PREVIEW]
    if (roles.includes(AvailableRoles.Study_coordinator)) {
      menu = [...menu, ...COORDINATOR_MENU]
    }

    if (roles.includes(AvailableRoles.Study_approver)) {
      menu = [...menu, ...APPROVER_MENU]
    }

    this.menuItems = menu
  }

  handleMenuClick(key: string, id: number): void {
    switch (key) {
      case StudyMenuKeys.Edit:
      case StudyMenuKeys.Preview:
      case StudyMenuKeys.Review:
        const queryParams = { mode: key.toLocaleLowerCase() }
        this.router.navigate(['studies', id, 'editor'], { queryParams })
        break

      default:
        console.log('TODO: Handle Clicked Menu Item: ', key)
        break
    }
  }
}
