import { Component } from '@angular/core'
import { ManagerChartsComponent } from '../manager-charts/manager-charts.component'
import { PseudonymResolverComponent } from '../pseudonym-resolver/pseudonym-resolver.component'

@Component({
  selector: 'num-manager-tools',
  templateUrl: './manager-tools.component.html',
  styleUrls: ['./manager-tools.component.scss'],
  imports: [ManagerChartsComponent, PseudonymResolverComponent],
})
export class ManagerToolsComponent {
  constructor() {}
}
