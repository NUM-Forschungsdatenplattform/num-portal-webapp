import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { SideMenuComponent } from './side-menu.component'
import { MaterialModule } from '../../material/material.module'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { AuthService } from 'src/app/core/auth/auth.service'
import { OAuthService } from 'angular-oauth2-oidc'
import { of, Subject } from 'rxjs'
import { ContentService } from '../../../core/services/content/content.service'
import { mockNavigationLinks } from '../../../../mocks/data-mocks/navigation-links.mock'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { COOKIE_DIALOG_CONFIG } from './constants'
import { Component } from '@angular/core'
import { AppConfigService } from 'src/app/config/app-config.service'
import { USERMANUAL } from 'src/app/core/constants/constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'

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

  const appConfig = {
    config: { api: { baseUrl: 'foo.bar' } },
  } as unknown as AppConfigService

  const mockContentService = {
    getNavigationLinks: jest.fn(),
  } as unknown as ContentService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    logout: jest.fn(),
    login: jest.fn(),
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as unknown as AuthService

  const afterClosedSubject$ = new Subject<boolean | undefined>()
  const mockDialogService = {
    openDialog: jest.fn().mockImplementation((_: any) => {
      return {
        afterClosed: () => afterClosedSubject$.asObservable(),
      }
    }),
  } as unknown as DialogService

  @Component({
    selector: 'num-test-router-target',
    template: '',
  })
  class TestRouterTargetComponentStub {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent, TestRouterTargetComponentStub],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([
          { path: '#login', component: TestRouterTargetComponentStub },
          { path: '#logout', component: TestRouterTargetComponentStub },
          { path: 'test', component: TestRouterTargetComponentStub },
          { path: 'home', component: TestRouterTargetComponentStub },
        ]),
        TranslateModule.forRoot(),
        DirectivesModule,
        HttpClientTestingModule,
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
        {
          provide: DialogService,
          useValue: mockDialogService,
        },
        {
          provide: AppConfigService,
          useValue: appConfig,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent)
    jest
      .spyOn(mockContentService, 'getNavigationLinks')
      .mockImplementation(() => of(mockNavigationLinks))
    component = fixture.componentInstance
    component.manualUrl = { DE: 'foo', EN: 'bar' }
    component.mainNavItemsExternal = [
      {
        icon: 'book-open',
        translationKey: 'NAVIGATION.USER_MANUAL',
        id: USERMANUAL,
        isExternal: true,
      },
    ]
    fixture.detectChanges()
    jest.spyOn(component.toggleSideMenu, 'emit')
    jest.spyOn(authService, 'logout').mockImplementation()
    jest.spyOn(authService, 'login').mockImplementation()
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Calls emit on toggleSideMenu when menu item is clicked', () => {
    component.mainNavItems = [
      {
        icon: 'test',
        routeTo: 'test',
        translationKey: 'test',
        isExternal: false,
      },
    ]
    userInfoSubject$.next(userInfo)
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('.mat-list-item')
    button.click()
    expect(component.toggleSideMenu.emit).toHaveBeenCalledTimes(1)
  })
  it('should navigate to dynamic user manual url (german)', () => {
    component.currentLang = 'de'
    const navItem = {
      icon: 'test',
      routeTo: 'test',
      translationKey: 'test',
      isExternal: true,
      id: USERMANUAL,
    }
    component.mainNavItems = null
    component.secondaryNavItems = [navItem]
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector(
      `[data-test="side-menu__secondary-nav__${navItem.translationKey}"]`
    ) as HTMLElement
    button.click()
    fixture.detectChanges()
  })
  it('should navigate to dynamic user manual url (english)', () => {
    component.currentLang = 'en'
    const navItem = {
      icon: 'test',
      routeTo: 'test',
      translationKey: 'test',
      isExternal: true,
      id: USERMANUAL,
    }
    component.mainNavItems = null
    component.secondaryNavItems = [navItem]
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector(
      `[data-test="side-menu__secondary-nav__${navItem.translationKey}"]`
    ) as HTMLElement
    button.click()
    fixture.detectChanges()
  })

  it('Calls logout function when logout button is clicked', () => {
    const navItem = {
      icon: 'test',
      routeTo: '#logout',
      translationKey: 'test',
      isExternal: false,
    }
    component.mainNavItems = null
    component.secondaryNavItems = [navItem]

    fixture.detectChanges()

    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector(
      `[data-test="side-menu__secondary-nav__${navItem.translationKey}"]`
    ) as HTMLElement
    button.click()
    fixture.detectChanges()
    expect(authService.logout).toHaveBeenCalled()
  })

  describe('When the login button is clicked', () => {
    let button: HTMLElement
    const navItem = {
      icon: 'test',
      routeTo: '#login',
      translationKey: 'test',
      isExternal: false,
    }
    beforeEach(() => {
      component.mainNavItems = null
      component.secondaryNavItems = [navItem]
      fixture.detectChanges()
      const nativeElement = fixture.debugElement.nativeElement
      button = nativeElement.querySelector(
        `[data-test="side-menu__secondary-nav__${navItem.translationKey}"]`
      ) as HTMLElement

      button.click()
      fixture.detectChanges()
    })

    it('should open the cookie dialog and call the login function on confirmation', () => {
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(COOKIE_DIALOG_CONFIG)
      afterClosedSubject$.next(true)
      expect(authService.login).toHaveBeenCalled()
    })

    it('should open the cookie dialog and not call the login function on discard', () => {
      expect(mockDialogService.openDialog).toHaveBeenCalledWith(COOKIE_DIALOG_CONFIG)
      afterClosedSubject$.next(false)
      expect(authService.login).not.toHaveBeenCalled()
    })
  })
})
