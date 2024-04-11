import { Component } from '@angular/core'
import { IAppConfig } from 'src/app/config/app-config.model'
import { AppConfigService } from 'src/app/config/app-config.service'

@Component({
  selector: 'num-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  config: IAppConfig

  constructor(private appConfig: AppConfigService) {
    this.config = this.appConfig.config
  }

  menuItemClicked($event: Event): void {
    const target = $event.currentTarget as HTMLElement
    target.blur()
    document.querySelector('mat-sidenav-content')?.scrollTo(0, 0)
  }
}
