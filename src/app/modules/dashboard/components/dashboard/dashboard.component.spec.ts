import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule } from '@ngx-translate/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { DashboardComponent } from './dashboard.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { IAppConfig } from 'src/app/config/app-config.model'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { AuthService } from 'src/app/core/auth/auth.service'
import { of, Subject } from 'rxjs'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { ContentService } from '../../../../core/services/content/content.service'
import { FlexLayoutModule } from '@angular/flex-layout'
import { mockDashboardCards } from '../../../../../mocks/data-mocks/dashboard-cards.mock'
import { Component } from '@angular/core'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>
  @Component({ selector: 'num-metrics', template: '' })
  class MetricsStubComponent {}

  const userInfoSubject$ = new Subject<any>()

  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const config = ({
    env: 'test',
  } as unknown) as IAppConfig

  const oauthService = ({
    loadUserProfile: () => Promise.resolve(),
  } as unknown) as OAuthService

  const mockContentService = ({
    getCards: jest.fn(),
  } as unknown) as ContentService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, MetricsStubComponent],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        DirectivesModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
      ],
      providers: [
        {
          provide: OAuthService,
          useValue: oauthService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    jest.spyOn(mockContentService, 'getCards').mockImplementation(() => of(mockDashboardCards))
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    component.config = config
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the cards from the api to the component', () => {
    expect(component.cards).toEqual(mockDashboardCards)
  })
})
