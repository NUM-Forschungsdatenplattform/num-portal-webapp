import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { routes } from '../../../app-routing.module'
import INavItem from '../../models/nav-item.interface'
import {
  mainNavItems,
  secondaryNavItemsLoggedIn,
  secondaryNavItemsLoggedOut,
} from '../../../core/constants/navigation'
import { AuthService } from 'src/app/core/auth/auth.service'

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  routes = routes
  mainNavItems = mainNavItems
  secondaryNavItems: INavItem[]
  secondaryNavItemsLoggedIn = secondaryNavItemsLoggedIn
  secondaryNavItemsLoggedOut = secondaryNavItemsLoggedOut

  isLoggedIn = false

  @Output() toggleSideMenu = new EventEmitter()

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    mainNavItems.forEach((item) => {
      const roles = routes.filter((route) => route.path === item.routeTo)[0].data?.roles
      item.roles = roles
    })

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
