import { Component, EventEmitter, Output } from '@angular/core'
import { mainNavItems, secondaryNavItems } from '../../navigation'
import INavItem from '../../models/nav-item.interface'
import { KeycloakService } from 'keycloak-angular'

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  mainNavItems = mainNavItems
  secondaryNavItems = secondaryNavItems

  @Output() toggleSideMenu = new EventEmitter()

  constructor(private keycloak: KeycloakService) {}

  menuItemClicked($event: Event, item?: INavItem): void {
    if (item.translationKey === 'NAVIGATION.SIGNOUT') {
      const redirectUri = window.location.origin + '/home'
      this.logout(redirectUri)
    }

    const target = $event.currentTarget as HTMLElement
    target.blur()
    this.toggleSideMenu.emit()
  }

  logout(redirectUri: string): void {
    this.keycloak.logout(redirectUri)
  }
}
