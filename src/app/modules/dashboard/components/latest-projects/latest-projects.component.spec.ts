import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of } from 'rxjs'
import { ContentService } from 'src/app/core/services/content/content.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { LocalizedDatePipe } from 'src/app/shared/pipes/localized-date.pipe'
import { mockDashboardProjects } from 'src/mocks/data-mocks/dashboard-projects.mock'

import { LatestProjectsComponent } from './latest-projects.component'

describe('ProjectsComponent', () => {
  let component: LatestProjectsComponent
  let fixture: ComponentFixture<LatestProjectsComponent>

  const mockContentService = {
    getLatestProjects: jest.fn(),
    projectsObservable$: new BehaviorSubject(mockDashboardProjects),
  } as unknown as ContentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LatestProjectsComponent, LocalizedDatePipe],
      imports: [
        TranslateModule.forRoot(),
        FlexLayoutModule,
        FontAwesomeTestingModule,
        MaterialModule,
      ],
      providers: [
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest
      .spyOn(mockContentService, 'getLatestProjects')
      .mockImplementation(() => of(mockDashboardProjects))
    fixture = TestBed.createComponent(LatestProjectsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch the latest projects on init', () => {
    expect(mockContentService.getLatestProjects).toHaveBeenCalled()
  })
})
