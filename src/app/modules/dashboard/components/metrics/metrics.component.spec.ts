import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { mockDashboardMetrics } from 'src/mocks/data-mocks/dashboard-metrics.mock'

import { MetricsComponent } from './metrics.component'

describe('MetricsComponent', () => {
  let component: MetricsComponent
  let fixture: ComponentFixture<MetricsComponent>

  const mockContentService = ({
    getMetrics: jest.fn(),
    metricsObservable$: new BehaviorSubject(mockDashboardMetrics),
  } as unknown) as ContentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricsComponent],
      imports: [TranslateModule.forRoot(), FlexLayoutModule, FontAwesomeTestingModule],
      providers: [
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockContentService, 'getMetrics').mockImplementation(() => of(mockDashboardMetrics))
    fixture = TestBed.createComponent(MetricsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch the metrics on init', () => {
    expect(mockContentService.getMetrics).toHaveBeenCalled()
  })
})
