import { Component, OnInit } from '@angular/core'
import { AppConfigService } from '../../../../config/app-config.service'
import { KeycloakService } from 'keycloak-angular'

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private appConfig: AppConfigService, private keycloak: KeycloakService) {}

  config = this.appConfig.config
  authTest: string

  ngOnInit(): void {
    this.init()
  }

  async init(): Promise<void> {
    const isLoggedIn = await this.keycloak.isLoggedIn()
    if (isLoggedIn) {
      const profile = await this.keycloak.loadUserProfile()
      const roles = this.keycloak.getUserRoles()

      this.authTest = 'Hello ' + profile.username + ', Roles: ' + roles.join(', ')
    } else {
      this.authTest = 'Not logged in'
    }
  }
}
