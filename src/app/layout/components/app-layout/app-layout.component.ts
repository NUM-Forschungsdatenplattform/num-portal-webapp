import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav'
import { ProfileService } from '../../../core/services/profile/profile.service'
import { Subscription } from 'rxjs'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { SideMenuComponent } from '../side-menu/side-menu.component'
import { FlexModule } from '@angular/flex-layout/flex'
import { HeaderComponent } from '../header/header.component'
import { MatIconButton } from '@angular/material/button'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { FooterComponent } from '../footer/footer.component'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'num-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  imports: [
    MatSidenavContainer,
    MatSidenav,
    SideMenuComponent,
    FlexModule,
    MatSidenavContent,
    HeaderComponent,
    MatIconButton,
    FaIconComponent,
    RouterOutlet,
    FooterComponent,
    TranslatePipe,
  ],
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
