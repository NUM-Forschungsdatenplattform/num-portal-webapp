import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BarChartComponent } from './bar-chart.component'
import { TranslateModule } from '@ngx-translate/core'
import { IBarChart } from 'src/app/shared/models/charts/bar-chart.interface'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('BarChartComponent', () => {
  let component: BarChartComponent
  let fixture: ComponentFixture<BarChartComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartComponent],
      imports: [TranslateModule.forRoot(), NoopAnimationsModule, NgxChartsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When new chart data arrives', () => {
    const mockBarChart: IBarChart = {
      data: [
        {
          name: 'test1',
          value: 1,
        },
        {
          name: 'test2',
          value: 2,
        },
        {
          name: 'test3',
          value: 3,
        },
      ],
      yLabel: 'yLabelTest',
      xLabel: 'xLabelTest',
      color: 'red',
    }
    beforeEach(() => {
      component.chartData = mockBarChart
    })

    it('should set barChartData', () => {
      expect(component.results).toEqual(mockBarChart.data)
      expect(component.yAxisLabel).toEqual(mockBarChart.yLabel)
      expect(component.colorScheme.domain[0]).toEqual(mockBarChart.color)
    })
  })

  describe('When new chart data arrives but is undefined', () => {
    const mockBarChart = undefined
    beforeEach(() => {
      component.chartData = mockBarChart
    })

    it('should set barChartData', () => {
      expect(component.results).toHaveLength(0)
    })
  })
})
