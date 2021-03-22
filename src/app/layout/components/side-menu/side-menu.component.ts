import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { routes } from '../../../app-routing.module'
import INavItem from '../../models/nav-item.interface'
import {
  mainNavItems,
  secondaryNavItemsLoggedIn,
  secondaryNavItemsLoggedOut,
} from '../../../core/constants/navigation'
import { AuthService } from 'src/app/core/auth/auth.service'
import { Subscription } from 'rxjs'
import { ContentService } from '../../../core/services/content/content.service'
import { INavigationLink } from '../../../shared/models/content/navigation-link.interface'

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  routes = routes
  mainNavItems = mainNavItems
  secondaryNavItems: INavItem[]
  navigationLinks: INavigationLink[]

  isLoggedIn = false

  @Output() toggleSideMenu = new EventEmitter()

  constructor(private authService: AuthService, public contentService: ContentService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe(() => this.handleUserInfo())
    )
    mainNavItems.forEach((item) => {
      const roles = routes.filter((route) => route.path === item.routeTo)[0].data?.roles
      item.roles = roles
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  fetchNavigationLinks(): void {
    this.contentService.getNavigationLinks().subscribe((data) => {
      this.navigationLinks = data
    })
  }

  handleUserInfo(): void {
    if (this.isLoggedIn) {
      this.secondaryNavItems = secondaryNavItemsLoggedIn
      this.fetchNavigationLinks()
    } else {
      this.navigationLinks = []
      this.secondaryNavItems = secondaryNavItemsLoggedOut
    }
  }

  menuItemClicked($event: Event, item: INavItem): void {
    if (item.routeTo === '#logout') {
      this.navigationLinks = []
      this.authService.logout()
    } else if (item.routeTo === '#login') {
      this.authService.login()
    }
    const target = $event.currentTarget as HTMLElement
    target.blur()
    this.toggleSideMenu.emit()
  }

  navigationLinkItemClicked(item: INavigationLink): void {
    window.open(item.url)
  }
}
