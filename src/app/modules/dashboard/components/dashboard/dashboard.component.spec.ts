import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { AppConfigService } from 'src/app/config/app-config.service'
import { DashboardComponent } from './dashboard.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { IAppConfig } from 'src/app/config/app-config.model'
import { OAuthModule } from 'angular-oauth2-oidc'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>

  let appConfig: AppConfigService
  let authService: OAuthService

  const config = ({
    env: 'test',
  } as unknown) as IAppConfig

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, OAuthModule.forRoot()],
      providers: [OAuthService],
    }).compileComponents()
  })

  beforeEach(() => {
    appConfig = TestBed.inject(AppConfigService)
    authService = TestBed.inject(OAuthService)

    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    component.config = config
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
