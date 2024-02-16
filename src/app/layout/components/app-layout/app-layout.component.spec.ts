/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from '../../material/material.module'
import { AppLayoutComponent } from './app-layout.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { MediaMatcher } from '@angular/cdk/layout'
import { TranslateModule } from '@ngx-translate/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { HeaderComponent } from '../header/header.component'
import { RouterTestingModule } from '@angular/router/testing'
import { LanguageComponent } from '../language/language.component'
import { Component, EventEmitter, Output } from '@angular/core'
import { of, Subject } from 'rxjs'
import { OAuthService } from 'angular-oauth2-oidc'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module'
import { HttpClient } from '@angular/common/http'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AuthService } from '../../../core/auth/auth.service'
import { ContentService } from '../../../core/services/content/content.service'
import { mockNavigationLinks } from '../../../../mocks/data-mocks/navigation-links.mock'
import { AppConfigService } from 'src/app/config/app-config.service'
import { NavigationEnd, Router } from '@angular/router'

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent
  let fixture: ComponentFixture<AppLayoutComponent>

  const oauthService = {
    logOut: () => {},
    loadUserProfile: () => Promise.resolve({}),
    hasValidIdToken: () => true,
    hasValidAccessToken: () => true,
    initCodeFlow: () => {},
    events: of(),
  } as unknown as OAuthService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const httpClient = {
    get: () => of(),
    post: () => of(),
  } as unknown as HttpClient

  const profileService = {
    get: () => jest.fn(),
    getUnapprovedUser: () => of(),
    userNotApproved: true,
  } as unknown as ProfileService

  const mockContentService = {
    getNavigationLinks: jest.fn(),
  } as unknown as ContentService

  let listenerCallback: (event: any) => any
  const mediaQueryList = {
    matches: true,
    addEventListener: jest.fn().mockImplementation((type: string, callback) => {
      listenerCallback = callback
    }),
    removeEventListener: jest.fn(),
  } as unknown as MediaQueryList

  const mediaMatcher = {
    matchMedia: jest.fn().mockImplementation(() => mediaQueryList),
  } as unknown as MediaMatcher

  @Component({ selector: 'num-footer', template: '' })
  class FooterStubComponent {}

  @Component({
    selector: 'num-side-menu',
    template: '',
  })
  class SideMenuComponentStub {
    @Output() toggleMenu = new EventEmitter()
  }

  @Component({
    selector: 'num-home',
    template: '',
  })
  class HomeStubComponent {}

  const mockConfigService = {
    config: {
      api: {
        baseUrl: '/api',
      },
      welcomePageTitle: {
        de: 'Test',
        en: 'Test',
      },
    },
  } as AppConfigService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppLayoutComponent,
        HeaderComponent,
        SideMenuComponentStub,
        LanguageComponent,
        FooterStubComponent,
        HomeStubComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: HomeStubComponent,
          },
        ]),
        DirectivesModule,
        SharedComponentsModule,
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
        {
          provide: ContentService,
          useValue: mockContentService,
        },
        {
          provide: AppConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compileComponents()
  })

  describe('On small devices', () => {
    beforeEach(() => {
      const mediaQueryListFake = mediaQueryList as any
      mediaQueryListFake.matches = true
      fixture = TestBed.createComponent(AppLayoutComponent)
      jest
        .spyOn(mockContentService, 'getNavigationLinks')
        .mockImplementation(() => of(mockNavigationLinks))
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

  describe('On permission need to show content', () => {
    beforeEach(() => {
      const mediaQueryListFake = mediaQueryList as any
      mediaQueryListFake.matches = false
      fixture = TestBed.createComponent(AppLayoutComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })
    it('should call isRouterOutletDisplayed', () => {
      jest.spyOn(component, 'isRouterOutletDisplayed')
      component.isRouterOutletDisplayed()
      expect(component.isRouterOutletDisplayed).toHaveBeenCalled()
    })

    it('should set the correct url', async () => {
      const router: Router = TestBed.inject(Router)
      const routerEventsSubject = new Subject<NavigationEnd>()
      const routerAny = { ...router, url: '/home' } as any
      routerAny.events = routerEventsSubject.asObservable()
      const routerEvent = new NavigationEnd(1, '/home', '/home')
      await fixture.ngZone.run(() => router.navigate(['/home']))
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()
      expect(routerAny.url).toEqual('/home')
    })
  })
})
