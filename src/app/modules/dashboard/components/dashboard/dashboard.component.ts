import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { ContentService } from 'src/app/core/services/content/content.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IDashboardCard } from 'src/app/shared/models/content/dashboard-card.interface'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { AppConfigService } from '../../../../config/app-config.service'
import { INITIATIVE_CLINICS_LOGOS, LOGOS_BASE_URL, PARTICIPANT_CLINICS_LOGOS } from './constants'

@Component({
  selector: 'num-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  AvailableRoles = AvailableRoles
  user: IAuthUserInfo
  constructor(
    private appConfig: AppConfigService,
    private authService: AuthService,
    private contentService: ContentService,
    private translateService: TranslateService
  ) {}

  config = this.appConfig.config
  participantLogosBaseUrl = LOGOS_BASE_URL
  participantLogos = PARTICIPANT_CLINICS_LOGOS
  initiativeLogos = INITIATIVE_CLINICS_LOGOS
  authTest: string
  cards: IDashboardCard[]
  displayLang: 'de' | 'en'
  isLoggedIn: boolean

  @ViewChild('participantsAnchor') participantsAnchor: ElementRef

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe((userInfo) => this.handleUserInfo(userInfo))
    )

    this.isLoggedIn = this.authService.isLoggedIn

    if (this.isLoggedIn) {
      this.fetchContentCards()
      this.getCurrentLang()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  fetchContentCards(): void {
    this.subscriptions.add(
      this.contentService.getCards().subscribe(
        (data) => {
          this.cards = data
          // this.isLoading = false
        },
        () => {
          // this.isLoading = false
        }
      )
    )
  }

  openCardUrl(cardUrl: string): void {
    console.log(cardUrl)
    window.open(cardUrl)
  }

  getCurrentLang(): void {
    this.displayLang = (this.translateService.currentLang as unknown) as 'en' | 'de'

    this.displayLang = this.translateService.currentLang as 'en' | 'de'
    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((newLang) => (this.displayLang = newLang.lang))
    )
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
