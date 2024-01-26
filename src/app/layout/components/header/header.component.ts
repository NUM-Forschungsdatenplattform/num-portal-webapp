/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivationEnd, Router, RouterEvent } from '@angular/router'
import { Subscription } from 'rxjs'
import INavItem from '../../models/nav-item.interface'
import { mainNavItems, secondaryNavItemsLoggedIn } from '../../../core/constants/navigation'
import { AppConfigService } from 'src/app/config/app-config.service'
import { TranslateService } from '@ngx-translate/core'

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
    private translateService: TranslateService,
  ) {}

  @Input()
  unapprovedUser: boolean

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        return this.handleRouterEvent(event as RouterEvent)
      }),
    )

    this.welcomePageTitle = this.config.config.welcomePageTitle

    this.subscriptions.add(
      this.translateService.onLangChange.subscribe((e) => {
        this.currentLang = e.lang
      }),
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
      (item) => item.routeTo === this.currentNavId,
    )
    this.currentNavItem = navItem
    this.currentTabNav = navItem?.tabNav
  }
}
