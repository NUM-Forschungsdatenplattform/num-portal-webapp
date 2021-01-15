import { Component, OnInit, ViewChild } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'num-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  @ViewChild('drawer', { static: true }) public drawer: MatSidenav
  isHandset: boolean

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((state) => {
      if (state.matches) {
        this.isHandset = true
      } else {
        this.isHandset = false
      }
    })
  }

  toggleMenu(): void {
    if (this.isHandset) {
      this.drawer.toggle()
    }
  }
}
