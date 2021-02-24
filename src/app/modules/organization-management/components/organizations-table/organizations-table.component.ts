import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'

@Component({
  selector: 'num-organizations-table',
  templateUrl: './organizations-table.component.html',
  styleUrls: ['./organizations-table.component.scss'],
})
export class OrganizationsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions = new Subscription()
  constructor(private organizationService: OrganizationService, private router: Router) {}

  displayedColumns: string[] = ['icon', 'name', 'mailDomains']
  dataSource = new MatTableDataSource()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.subscriptions.add(
      this.organizationService.organizationsObservable$.subscribe((organizations) =>
        this.handleData(organizations)
      )
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(organizations: IOrganization[]): void {
    this.dataSource.data = organizations
  }

  handleSelectClick(organization: IOrganization): void {
    this.router.navigate(['organizations', organization.id, 'editor'])
  }
}
