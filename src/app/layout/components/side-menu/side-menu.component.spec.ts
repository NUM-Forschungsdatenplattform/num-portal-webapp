import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { SideMenuComponent } from './side-menu.component'
import { MaterialModule } from '../../material/material.module'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { AuthService } from 'src/app/core/auth/auth.service'
import { OAuthService } from 'angular-oauth2-oidc'
import { Subject } from 'rxjs'

describe('SideMenuComponent', () => {
  let component: SideMenuComponent
  let fixture: ComponentFixture<SideMenuComponent>

  const userInfo = {
    sub: 'sub123-456',
    groups: ['user', 'has', 'required', 'role'],
  }

  const oauthService = {
    logOut: () => {},
    initCodeFlow: () => {},
  } as OAuthService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    logout: () => {},
    login: () => {},
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        DirectivesModule,
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
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(component.toggleSideMenu, 'emit')
    jest.spyOn(authService, 'logout')
    jest.spyOn(authService, 'login')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Calls emit on toggleSideMenu when menu item is clicked', () => {
    component.mainNavItems = [
      {
        icon: 'test',
        routeTo: '/test',
        translationKey: 'test',
      },
    ]
    userInfoSubject$.next(userInfo)
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('.mat-list-item')
    button.click()
    expect(component.toggleSideMenu.emit).toHaveBeenCalled()
  })

  it('Calls logout function when logout button is clicked', () => {
    component.mainNavItems = null
    component.secondaryNavItems = [
      {
        icon: 'test',
        routeTo: '#logout',
        translationKey: 'test',
      },
    ]
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('.mat-list-item')
    button.click()
    fixture.detectChanges()
    expect(authService.logout).toHaveBeenCalled()
  })

  it('Calls login function when login button is clicked', () => {
    component.mainNavItems = null
    component.secondaryNavItems = [
      {
        icon: 'test',
        routeTo: '#login',
        translationKey: 'test',
      },
    ]
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('.mat-list-item')
    button.click()
    fixture.detectChanges()
    expect(authService.login).toHaveBeenCalled()
  })
})
