import { Component, EventEmitter, Output } from '@angular/core'
import { mainNavItems, secondaryNavItems } from '../../navigation'
import { routes } from '../../../app-routing.module'

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  routes = routes
  mainNavItems = mainNavItems
  secondaryNavItems = secondaryNavItems

  @Output() toggleSideMenu = new EventEmitter()

  constructor() {}

  getAllowedRoles(routeTo: string): string[] {
    const allowedRoles = routes.filter((x) => x.path === routeTo)['0'].data.roles
    return allowedRoles
  }

  menuItemClicked($event: Event): void {
    const target = $event.currentTarget as HTMLElement
    target.blur()
    this.toggleSideMenu.emit()
  }
}
