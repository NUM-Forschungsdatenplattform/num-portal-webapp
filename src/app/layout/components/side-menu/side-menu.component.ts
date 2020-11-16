import { Component, EventEmitter, Output } from '@angular/core'
import { mainNavItems, secondaryNavItems } from '../../navigation'
import INavItem from '../../models/nav-item.interface'
import { OAuthService } from 'angular-oauth2-oidc'

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  mainNavItems = mainNavItems
  secondaryNavItems = secondaryNavItems

  @Output() toggleSideMenu = new EventEmitter()

  constructor(private oauthService: OAuthService) {}

  menuItemClicked($event: Event, item: INavItem): void {
    if (item.routeTo === '#logout') {
      this.oauthService.logOut()
    }

    const target = $event.currentTarget as HTMLElement
    target.blur()
    this.toggleSideMenu.emit()
  }
}
