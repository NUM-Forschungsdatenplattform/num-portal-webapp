import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { routes } from '../../../app-routing.module'
import INavItem from '../../models/nav-item.interface'
import {
  mainNavItems,
  mainNavItemsExternal,
  secondaryNavItemsLoggedIn,
  secondaryNavItemsLoggedOut,
} from '../../../core/constants/navigation'
import { AuthService } from 'src/app/core/auth/auth.service'
import { Subscription } from 'rxjs'
import { ContentService } from '../../../core/services/content/content.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { COOKIE_DIALOG_CONFIG } from './constants'
import { HttpClient } from '@angular/common/http'
import { AppConfigService } from 'src/app/config/app-config.service'
import { USERMANUAL } from 'src/app/core/constants/constants'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  routes = routes
  mainNavItems = mainNavItems
  mainNavItemsExternal = mainNavItemsExternal
  secondaryNavItems: INavItem[]
  baseUrl: string

  isLoggedIn = false

  manualUrl: any
  currentLang = 'de'

  @Output() toggleSideMenu = new EventEmitter()

  constructor(
    private authService: AuthService,
    public contentService: ContentService,
    private dialogService: DialogService,
    private httpClient: HttpClient,
    private appConfig: AppConfigService,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe(() => this.handleUserInfo())
    )
    this.getDynamicExternalURLs()
    mainNavItems.forEach((item) => {
      const roles = routes.filter((route) => route.path === item.routeTo)[0].data?.roles
      item.roles = roles
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleUserInfo(): void {
    if (this.authService.isLoggedIn) {
      this.contentService.getNavigationLinks().subscribe()
      this.isLoggedIn = true
      this.secondaryNavItems = secondaryNavItemsLoggedIn
    } else {
      this.isLoggedIn = false
      this.secondaryNavItems = secondaryNavItemsLoggedOut
    }
  }

  menuItemClicked($event: Event, item?: INavItem): void {
    if (item?.routeTo === '#logout') {
      this.authService.logout()
    } else if (item?.routeTo === '#login') {
      this.handleLoginWithDialog()
    }
    // handle dynamic external urls
    if (item && item.isExternal) {
      let lang: string
      switch (item.id) {
        case USERMANUAL:
          if (!this.translateService || !this.translateService.currentLang) {
            lang = this.currentLang
          } else {
            lang = this.translateService.currentLang
          }
          /* if (this.translateService.currentLang == 'de') { */
          if (lang == 'de') {
            window.open(this.manualUrl.DE, '_blank')
            /* } else if (this.translateService.currentLang == 'en') { */
          } else if (lang == 'en') {
            window.open(this.manualUrl.EN, '_blank')
          }
      }
    }
    const target = $event.currentTarget as HTMLElement
    target.blur()
    this.toggleSideMenu.emit()
  }

  getDynamicExternalURLs(): void {
    this.httpClient
      .get(`${this.appConfig.config.api.baseUrl}/admin/manuel-url`)
      .subscribe((response: any) => {
        this.manualUrl = response.userManualUrl
      })
  }

  handleLoginWithDialog(): void {
    const dialogRef = this.dialogService.openDialog(COOKIE_DIALOG_CONFIG)
    dialogRef.afterClosed().subscribe((confirmResult: boolean | undefined) => {
      if (confirmResult === true) {
        this.authService.login()
      }
    })
  }
}
