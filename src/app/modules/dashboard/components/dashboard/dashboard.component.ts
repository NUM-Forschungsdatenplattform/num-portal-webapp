import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { AppConfigService } from '../../../../config/app-config.service'
import { INITIATIVE_CLINICS_LOGO, LOGO_ADDRESS, PARTICIPANT_CLINICS_LOGO } from './constants'

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  AvailableRoles = AvailableRoles
  user: IAuthUserInfo
  constructor(private appConfig: AppConfigService, private authService: AuthService) {}

  config = this.appConfig.config
  participantLogosBaseUrl = LOGO_ADDRESS
  participantLogos = PARTICIPANT_CLINICS_LOGO
  initiativeLogos = INITIATIVE_CLINICS_LOGO
  authTest: string

  @ViewChild('participantsAnchor') participantsAnchor: ElementRef

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe((userInfo) => this.handleUserInfo(userInfo))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleUserInfo(userInfo: IAuthUserInfo): void {
    this.user = userInfo
    if (this.authService.isLoggedIn) {
      const roles = this.user.groups
      if (roles) {
        this.authTest = 'Hello ' + this.user.name + ', Roles: ' + roles.join(', ')
      }
    } else {
      this.authTest = 'Not logged in'
    }
  }

  scrollToParticipants(): void {
    const targetElement = this.participantsAnchor.nativeElement
    targetElement.scrollIntoView({ behavior: 'smooth' })
  }
}
