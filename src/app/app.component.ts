import { Component } from '@angular/core'
import { AppLayoutComponent } from './layout/components/app-layout/app-layout.component'

@Component({
  selector: 'num-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [AppLayoutComponent],
})
export class AppComponent {
  title = 'num-portal-webapp'
  constructor() {}
}
