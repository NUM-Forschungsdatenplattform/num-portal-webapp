import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivationEnd, Router, RouterEvent } from '@angular/router'
import { Subscription } from 'rxjs'
import INavItem from '../../models/nav-item.interface'
import { mainNavItems } from '../../../core/constants/navigation'

@Component({
  selector: 'num-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()

  mainNavItems = mainNavItems
  currentNavId: string
  currentMainNavItem: INavItem
  currentTabNav: INavItem[] = null
  currentTabNavSelected: string

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.subscribe((event) => this.handleRouterEvent(event as RouterEvent))
    )
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
    const navItem = this.mainNavItems.find((item) => item.routeTo === this.currentNavId)
    this.currentMainNavItem = navItem
    this.currentTabNav = navItem?.tabNav
  }
}
