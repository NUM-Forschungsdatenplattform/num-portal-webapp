import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { OrganizationService } from 'src/app/core/services/organization.service'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'

@Component({
  selector: 'num-add-user-organization',
  templateUrl: './add-user-organization.component.html',
  styleUrls: ['./add-user-organization.component.scss'],
})
export class AddUserOrganizationComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions = new Subscription()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @Input() selectedOrganization: IOrganization
  @Output() selectedOrganizationChange = new EventEmitter<IOrganization>()

  constructor(private organizationService: OrganizationService) {}

  dataSource = new MatTableDataSource<IOrganization>()
  displayedColumns: string[] = ['name', 'icon']

  ngOnInit(): void {
    this.subscriptions.add(
      this.organizationService.filteredOrganizationsObservable$.subscribe((organizations) =>
        this.handleData(organizations)
      )
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleData(organizations: IOrganization[]): void {
    this.dataSource.data = organizations
  }

  handleSelectClick(row: IOrganization): void {
    this.selectedOrganization = row
    this.selectedOrganizationChange.emit(this.selectedOrganization)
  }

  handleDeselectClick(): void {
    this.selectedOrganization = {
      id: '',
    }
    this.selectedOrganizationChange.emit(this.selectedOrganization)
  }
}
