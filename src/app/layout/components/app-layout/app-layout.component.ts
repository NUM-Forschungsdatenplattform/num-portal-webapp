import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MediaMatcher } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'num-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) public drawer: MatSidenav
  isSmallDevice = false
  matcher: MediaQueryList

  constructor(private mediaMatcher: MediaMatcher) {}

  ngOnInit(): void {
    this.matcher = this.mediaMatcher.matchMedia('(max-width: 960px)')
    this.isSmallDevice = this.matcher.matches

    this.matcher.addEventListener('change', (event) => {
      this.isSmallDeviceListener(event)
    })
  }

  ngOnDestroy(): void {
    this.matcher.removeEventListener('change', this.isSmallDeviceListener)
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
