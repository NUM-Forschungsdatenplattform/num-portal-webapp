import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { BarChartComponent } from './bar-chart.component'
import { ChartsModule } from 'ng2-charts'
import { TranslateModule } from '@ngx-translate/core'

describe('BarChartComponent', () => {
  let component: BarChartComponent
  let fixture: ComponentFixture<BarChartComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BarChartComponent],
        imports: [ChartsModule, TranslateModule.forRoot()],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
