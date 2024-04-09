import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ManagerToolsComponent } from './components/manager-tools/manager-tools.component'
import { ManagerToolsRoutingModule } from './manager-tools-routing.module'
import { SharedModule } from 'src/app/shared/shared.module'
import { LayoutModule } from 'src/app/layout/layout.module'
import { BarChartComponent } from './components/bar-chart/bar-chart.component'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { ManagerChartsComponent } from './components/manager-charts/manager-charts.component'
import { PseudonymResolverComponent } from './components/pseudonym-resolver/pseudonym-resolver.component'

@NgModule({
  declarations: [
    ManagerToolsComponent,
    BarChartComponent,
    ManagerChartsComponent,
    PseudonymResolverComponent,
  ],
  exports: [ManagerToolsComponent, BarChartComponent],
  imports: [CommonModule, ManagerToolsRoutingModule, NgxChartsModule, SharedModule, LayoutModule],
})
export class ManagerToolsModule {}
