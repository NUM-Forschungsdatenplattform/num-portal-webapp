import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from '../../material/material.module'
import { AppLayoutComponent } from './app-layout.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent } from '../header/header.component'
import { SideMenuComponent } from '../side-menu/side-menu.component'
import { RouterTestingModule } from '@angular/router/testing'
import { LanguageComponent } from '../language/language.component'
import { Component } from '@angular/core'
import { of } from 'rxjs'
import { OAuthService } from 'angular-oauth2-oidc'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module'
import { HttpClient } from '@angular/common/http'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { FlexLayoutModule } from '@angular/flex-layout'

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent
  let fixture: ComponentFixture<AppLayoutComponent>

  const authService = {
    logOut: () => {},
    loadUserProfile: () => Promise.resolve({}),
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
    events: of(),
  } as OAuthService

  const httpClient = ({
    get: () => of(),
    post: () => of(),
  } as unknown) as HttpClient

  const profileService = ({
    get: () => jest.fn(),
  } as unknown) as ProfileService

  let listenerCallback: (event: any) => any
  const mediaQueryList = ({
    matches: true,
    addEventListener: jest.fn().mockImplementation((type: string, callback) => {
      listenerCallback = callback
    }),
    removeEventListener: jest.fn(),
  } as unknown) as MediaQueryList

  const mediaMatcher = ({
    matchMedia: jest.fn().mockImplementation(() => mediaQueryList),
  } as unknown) as MediaMatcher

  @Component({ selector: 'num-footer', template: '' })
  class FooterStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppLayoutComponent,
        HeaderComponent,
        SideMenuComponent,
        LanguageComponent,
        FooterStubComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([]),
        DirectivesModule,
        SharedComponentsModule,
      ],
      providers: [
        {
          provide: OAuthService,
          useValue: authService,
        },
        {
          provide: HttpClient,
          useValue: httpClient,
        },
        {
          provide: ProfileService,
          useValue: profileService,
        },
        {
          provide: MediaMatcher,
          useValue: mediaMatcher,
        },
      ],
    }).compileComponents()
  })

  describe('On small devices', () => {
    beforeEach(() => {
      const mediaQueryListFake = mediaQueryList as any
      mediaQueryListFake.matches = true
      fixture = TestBed.createComponent(AppLayoutComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should call toggleMenu function on menu-button click', () => {
      jest.spyOn(component, 'toggleMenu')
      const nativeElement = fixture.debugElement.nativeElement
      const button = nativeElement.querySelector('#menu-toggle-button')
      button.click()
      expect(component.toggleMenu).toHaveBeenCalled()
    })

    it('should call drawer toggle function on toggleMenu function', () => {
      jest.spyOn(component.drawer, 'toggle')
      component.toggleMenu()
      expect(component.drawer.toggle).toHaveBeenCalled()
    })

    it('should switch the flag to large device on change', () => {
      const event = {
        matches: false,
      }
      listenerCallback(event)
      expect(component.isSmallDevice).toBeFalsy()
    })
  })

  describe('On large devices', () => {
    beforeEach(() => {
      const mediaQueryListFake = mediaQueryList as any
      mediaQueryListFake.matches = false
      fixture = TestBed.createComponent(AppLayoutComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('menu-button should not be rendered', () => {
      const nativeElement = fixture.debugElement.nativeElement
      const button = nativeElement.querySelector('#menu-toggle-button')
      expect(button).toBeNull()
    })

    it('should not call drawer toggle function on toggleMenu function', () => {
      jest.spyOn(component.drawer, 'toggle')
      component.toggleMenu()
      expect(component.drawer.toggle).not.toHaveBeenCalled()
    })
  })
})
