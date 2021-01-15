import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/core/auth/auth.service'
import { AppConfigService } from '../../../../config/app-config.service'

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any = {}
  constructor(private appConfig: AppConfigService, private authService: AuthService) {
    this.authService.userInfoObservable$.subscribe((user) => (this.user = user))
  }

  config = this.appConfig.config
  authTest: string

  ngOnInit(): void {
    this.init()
  }

  async init(): Promise<void> {
    if (this.authService.isLoggedIn) {
      const roles = this.user.groups
      if (roles) {
        this.authTest = 'Hello ' + this.user.name + ', Roles: ' + roles.join(', ')
      }
    } else {
      this.authTest = 'Not logged in'
    }
  }
}
