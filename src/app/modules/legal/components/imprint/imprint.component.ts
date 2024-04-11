import { Component, OnDestroy, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-imprint',
  templateUrl: './imprint.component.html',
})
export class ImprintComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  constructor(private translateService: TranslateService) {}
  profs: string[] = []

  ngOnInit(): void {
    this.profs = this.translateService.instant('IMPRINT.TEXTS.PROFS')
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe(() => {
        this.profs = this.translateService.instant('IMPRINT.TEXTS.PROFS')
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
