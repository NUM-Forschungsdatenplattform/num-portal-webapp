import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav'
import { ProfileService } from '../../../core/services/profile/profile.service'
import { Subscription } from 'rxjs'
import { NavigationEnd, Router } from '@angular/router'
import { AuthService } from 'src/app/core/auth/auth.service'

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
    private route: Router,
    private authService: AuthService
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

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn
  }

  isRouterOutletDisplayed(): boolean {
    return !this.unapprovedUser || this.onHomePage
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
