import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivationEnd, Router, RouterEvent } from '@angular/router'
import { Subscription } from 'rxjs'
import INavItem from '../../models/nav-item.interface'
import { mainNavItems, secondaryNavItemsLoggedIn } from '../../../core/constants/navigation'
import { AppConfigService } from 'src/app/config/app-config.service'
import { TranslateService } from '@ngx-translate/core'
import { AvailableFeatures } from '../../../shared/models/feature/available-features.enum'

@Component({
  selector: 'num-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  mainNavItems = mainNavItems
  currentLang: string
  currentNavId: string
  currentNavItem: INavItem
  currentTabNav: INavItem[] = null
  currentTabNavSelected: string
  welcomePageTitle: {
    de: string
    en: string
  }

  constructor(
    private config: AppConfigService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  @Input()
  unapprovedUser: boolean

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        return this.handleRouterEvent(event as RouterEvent)
      })
    )

    this.welcomePageTitle = this.config.config.welcomePageTitle

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((e) => {
        this.currentLang = e.lang
      })
    )
    this.currentLang = this.translateService.currentLang
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof ActivationEnd) {
      this.currentTabNavSelected = routerEvent.snapshot.firstChild?.data?.tabNavId

      const navId = routerEvent.snapshot.data.navId
      if (navId !== this.currentNavId) {
        this.currentNavId = navId
        this.setHeader()
      }
    }
  }

  setHeader(): void {
    const navItem = [...this.mainNavItems, ...secondaryNavItemsLoggedIn].find(
      (item) => item.routeTo === this.currentNavId
    )
    this.currentNavItem = navItem
    this.currentTabNav = navItem?.tabNav
  }

  protected readonly AvailableFeatures = AvailableFeatures
}
