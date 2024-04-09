import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'

@Component({
  selector: 'num-latest-projects',
  templateUrl: './latest-projects.component.html',
  styleUrls: ['./latest-projects.component.scss'],
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
