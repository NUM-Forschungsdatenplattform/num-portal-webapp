import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { Component, Input } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDividerModule } from '@angular/material/divider'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IDictionary } from 'src/app/shared/models/dictionary.interface'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { SharedModule } from 'src/app/shared/shared.module'
import { mockCohortPreviewData } from 'src/mocks/data-mocks/cohort-graph.mock'
import { VerticalBarChartHarness } from '../vertical-bar-chart/testing/vertical-bar-chart.harness'

import { CohortGraphsComponent } from './cohort-graphs.component'

describe('CohortGraphsComponent', () => {
  let component: CohortGraphsComponent
  let fixture: ComponentFixture<CohortGraphsComponent>
  let loader: HarnessLoader

  const userInfoSubject$ = new Subject<IAuthUserInfo>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  @Component({
    selector: 'num-vertical-bar-chart',
    template: '<div></div>',
  })
  class VerticalBarChartComponentStub {
    @Input() color: string
    @Input() data: IDictionary<number, number>
    @Input() graphName: string
    @Input() xAxisName: string
    @Input() yAxisName: string
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CohortGraphsComponent, VerticalBarChartComponentStub],
      imports: [MatDividerModule, SharedModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CohortGraphsComponent)
    component = fixture.componentInstance
    component.previewData = { ages: {}, count: 0, hospitals: {} }
    fixture.detectChanges()
    loader = TestbedHarnessEnvironment.loader(fixture)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When data is provided', () => {
    beforeEach(() => {
      component.previewData = mockCohortPreviewData
    })

    it('should show both graphs if the user is a manager', async () => {
      userInfoSubject$.next({ sub: '', groups: [AvailableRoles.Manager] })
      const graphElements = await loader.getAllHarnesses(VerticalBarChartHarness)
      expect(graphElements).toHaveLength(2)
    })

    it('should hide the graphs from non manager users', async () => {
      userInfoSubject$.next({ sub: '', groups: [AvailableRoles.Researcher] })
      const graphElements = await loader.getAllHarnesses(VerticalBarChartHarness)
      expect(graphElements).toHaveLength(0)
    })
  })

  describe('When no data is provided', () => {
    beforeEach(() => {
      component.previewData = { ages: {}, count: 0, hospitals: {} }
      fixture.detectChanges()
    })

    it('should not render any graphs if the user is a manager', async () => {
      userInfoSubject$.next({ sub: '', groups: [AvailableRoles.Manager] })
      const graphElement = await loader.getAllHarnesses(VerticalBarChartHarness)
      expect(graphElement.length).toEqual(0)
    })
  })
})
