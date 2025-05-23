import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivationEnd, Router, RouterEvent, RouterLinkActive, RouterLink } from '@angular/router'
import { Subscription } from 'rxjs'
import INavItem from '../../models/nav-item.interface'
import { mainNavItems, secondaryNavItemsLoggedIn } from '../../../core/constants/navigation'
import { AppConfigService } from 'src/app/config/app-config.service'
import { TranslateService, TranslatePipe } from '@ngx-translate/core'
import { AvailableFeatures } from '../../../shared/models/feature/available-features.enum'
import { MatToolbar } from '@angular/material/toolbar'
import { FlexModule } from '@angular/flex-layout/flex'
import { LanguageComponent } from '../language/language.component'
import { ExtendedModule } from '@angular/flex-layout/extended'
import { NgClass } from '@angular/common'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs'
import { FeatureIsActiveDirective } from '../../../shared/directives/feature-is-active.directive'
import { UserHasRoleDirective } from '../../../shared/directives/user-has-role.directive'

@Component({
  selector: 'num-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MatToolbar,
    FlexModule,
    LanguageComponent,
    ExtendedModule,
    NgClass,
    FaIconComponent,
    MatTabNav,
    FeatureIsActiveDirective,
    UserHasRoleDirective,
    MatTabLink,
    RouterLinkActive,
    RouterLink,
    MatTabNavPanel,
    TranslatePipe,
  ],
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
