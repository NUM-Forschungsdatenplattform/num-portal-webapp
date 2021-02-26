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
    this.config = appConfig.config
  }
}
