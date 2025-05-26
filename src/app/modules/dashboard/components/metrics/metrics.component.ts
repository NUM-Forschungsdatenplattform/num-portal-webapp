import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { FlexModule } from '@angular/flex-layout/flex'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { AsyncPipe } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  imports: [FlexModule, FaIconComponent, AsyncPipe, TranslatePipe],
})
export class MetricsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription()
  constructor(public contentService: ContentService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.contentService.getMetrics().subscribe())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
