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
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'

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
  secondaryNavItemsLoggedIn = secondaryNavItemsLoggedIn
  secondaryNavItemsLoggedOut = secondaryNavItemsLoggedOut

  isLoggedIn = false

  @Output() toggleSideMenu = new EventEmitter()

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userInfoObservable$.subscribe((userInfo) => this.handleUserInfo(userInfo))
    )
    mainNavItems.forEach((item) => {
      const roles = routes.filter((route) => route.path === item.routeTo)[0].data?.roles
      item.roles = roles
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  handleUserInfo(userInfo: IAuthUserInfo): void {
    this.authService.isLoggedIn
      ? (this.secondaryNavItems = secondaryNavItemsLoggedIn)
      : (this.secondaryNavItems = secondaryNavItemsLoggedOut)
  }

  menuItemClicked($event: Event, item: INavItem): void {
    if (item.routeTo === '#logout') {
      this.authService.logout()
    } else if (item.routeTo === '#login') {
      this.authService.login()
    }
    const target = $event.currentTarget as HTMLElement
    target.blur()
    this.toggleSideMenu.emit()
  }
}
