import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { mainNavItems, secondaryNavItems } from '../../navigation'
import { routes } from '../../../app-routing.module'

@Component({
  selector: 'num-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  routes = routes
  mainNavItems = mainNavItems
  secondaryNavItems = secondaryNavItems

  @Output() toggleSideMenu = new EventEmitter()

  constructor() {}

  ngOnInit() {
    mainNavItems.forEach((item) => {
      const roles = routes.filter((route) => route.path === item.routeTo)[0].data?.roles
      item.roles = roles
    })
  }

  menuItemClicked($event: Event): void {
    const target = $event.currentTarget as HTMLElement
    target.blur()
    this.toggleSideMenu.emit()
  }
}
