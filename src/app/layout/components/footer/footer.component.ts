import { Component } from '@angular/core'
import { IAppConfig } from 'src/app/config/app-config.model'
import { AppConfigService } from 'src/app/config/app-config.service'
import { FlexModule } from '@angular/flex-layout/flex'
import { MatAnchor } from '@angular/material/button'
import { RouterLink } from '@angular/router'
import { MatDivider } from '@angular/material/list'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [FlexModule, MatAnchor, RouterLink, MatDivider, TranslatePipe],
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
