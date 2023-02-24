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

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav'
import { ProfileService } from '../../../core/services/profile/profile.service'
import { Subscription } from 'rxjs'
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'num-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) public drawer: MatSidenav
  private subscriptions = new Subscription()
  isSmallDevice = false
  matcher: MediaQueryList
  unapprovedUser = false
  onHomePage = false

  constructor(
    private mediaMatcher: MediaMatcher,
    private profileService: ProfileService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.matcher = this.mediaMatcher.matchMedia('(max-width: 960px)')
    this.isSmallDevice = this.matcher.matches

    this.matcher.addEventListener('change', (event) => {
      this.isSmallDeviceListener(event)
    })

    this.subscriptions.add(
      this.profileService.getUnapprovedUser().subscribe((response: any) => {
        this.unapprovedUser = response
      })
    )
    this.subscriptions.add(
      this.route.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url === '/home') {
            this.onHomePage = true
          } else {
            this.onHomePage = false
          }
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.matcher.removeEventListener('change', this.isSmallDeviceListener)
    this.subscriptions.unsubscribe()
  }

  isSmallDeviceListener(event): void {
    this.isSmallDevice = event.matches
  }

  toggleMenu(): void {
    if (this.isSmallDevice) {
      this.drawer.toggle()
    }
  }
}
