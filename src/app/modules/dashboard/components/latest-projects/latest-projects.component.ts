import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
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
import { AsyncPipe } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import { LocalizedDatePipe } from '../../../../shared/pipes/localized-date.pipe'

@Component({
  selector: 'num-latest-projects',
  templateUrl: './latest-projects.component.html',
  styleUrls: ['./latest-projects.component.scss'],
  imports: [
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
    AsyncPipe,
    TranslatePipe,
    LocalizedDatePipe,
  ],
})
export class LatestProjectsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()
  displayedColumns = ['createDate', 'title', 'coordinator', 'organization']
  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.contentService.getLatestProjects().subscribe())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
