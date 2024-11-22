import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, ActivationEnd, ActivationStart, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { MaterialModule } from '../../material/material.module'
import INavItem from '../../models/nav-item.interface'
import { ButtonComponent } from '../../../shared/components/button/button.component'
import { LanguageComponent } from '../language/language.component'
import { HeaderComponent } from './header.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AvailableRoles } from 'src/app/shared/models/available-roles.enum'
import { IAuthUserInfo } from 'src/app/shared/models/user/auth-user-info.interface'
import { AuthService } from 'src/app/core/auth/auth.service'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatTabLinkHarness } from '@angular/material/tabs/testing'
import { UserHasRoleDirective } from 'src/app/shared/directives/user-has-role.directive'
import { AppConfigService } from 'src/app/config/app-config.service'
import { AvailableFeatures } from '../../../shared/models/feature/available-features.enum'
import { IFeature } from '../../../shared/models/feature/feature.interface'
import { FeatureIsActiveDirective } from '../../../shared/directives/feature-is-active.directive'
import { FeatureService } from '../../../core/services/feature/feature.service'
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing'
import { HttpClient, HttpHandler } from '@angular/common/http'
import spyOn = jest.spyOn
import { getFeature } from 'echarts/types/src/component/toolbox/featureManager'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let router: Router
  const routerEventsSubject = new Subject<ActivationEnd | ActivationStart>()

  @Component({ selector: 'num-stub', template: '<div mat-tab-nav-panel></div>' })
  class StubComponent {}

  const mockConfigService = {
    config: {
      api: {
        baseUrl: '/api',
      },
      welcomePageTitle: {
        de: 'Test Seite',
        en: 'Test page',
      },
    },
  } as AppConfigService

  const firstNavItem: INavItem = {
    routeTo: 'first',
    translationKey: 'first',
    icon: 'test',
  }

  const homeNavItem: INavItem = {
    routeTo: 'home',
    translationKey: 'home',
    icon: 'test',
  }

  const secondNavItem: INavItem = {
    routeTo: 'second',
    translationKey: 'second',
    icon: 'test',
  }

  const thirdNavItem: INavItem = {
    routeTo: 'third',
    translationKey: 'third',
    icon: 'test',
    tabNav: [
      {
        routeTo: 'tabnav1',
        translationKey: 'tabnav1',
      },
      {
        routeTo: 'tabnav2',
        translationKey: 'tabnav2',
      },
    ],
  }

  const navItemsWithRestrictedTabs: INavItem = {
    routeTo: 'parent',
    translationKey: 'parent',
    icon: 'test',
    tabNav: [
      {
        routeTo: 'visibleToAll',
        translationKey: 'visibleToAll',
      },
      {
        routeTo: 'restrictedToManager',
        translationKey: 'restrictedToManager',
        roles: [AvailableRoles.Manager],
        feature: [AvailableFeatures.SearchByManager],
      },
    ],
  }

  const mainNavItems = [
    firstNavItem,
    secondNavItem,
    thirdNavItem,
    homeNavItem,
    navItemsWithRestrictedTabs,
  ]
  const mockUserInfoSubject = new Subject<IAuthUserInfo>()
  const mockAuthService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: mockUserInfoSubject.asObservable(),
  } as unknown as AuthService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        LanguageComponent,
        StubComponent,
        ButtonComponent,
        UserHasRoleDirective,
        FeatureIsActiveDirective,
      ],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
        FlexLayoutModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'third',
            component: StubComponent,
            children: [
              {
                path: 'tabnav1',
                component: StubComponent,
              },
            ],
          },
        ]),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: AppConfigService,
          useValue: mockConfigService,
        },
        FeatureService,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    jest.spyOn(router, 'events', 'get').mockReturnValue(routerEventsSubject.asObservable())
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    component.mainNavItems = mainNavItems
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On ActivationEnd to a route without tab navigation', () => {
    const routeSnapshot = {
      data: {
        navId: 'second',
      },
    } as unknown as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should set the mainNav header only', () => {
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.currentNavId).toEqual('second')
      expect(component.currentNavItem).toBe(secondNavItem)
      expect(component.currentTabNav).toBeFalsy()
    })
  })

  describe('On ActivationEnd to a route with tab navigation', () => {
    const routeSnapshot = {
      data: {
        navId: 'third',
      },
    } as unknown as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should set the mainNav header only', () => {
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.currentNavId).toEqual('third')
      expect(component.currentNavItem).toBe(thirdNavItem)
      expect(component.currentTabNav).toBe(thirdNavItem.tabNav)
    })
  })

  describe('On ActivationEnd to a route without navId', () => {
    const routeSnapshot = {
      data: {
        navId: 'nope',
      },
    } as unknown as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should set the mainNav to be undefined', () => {
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.currentNavId).toEqual('nope')
      expect(component.currentNavItem).toBeFalsy()
      expect(component.currentTabNav).toBeFalsy()
    })
  })

  describe('On ActivationStart to a route', () => {
    const routeSnapshot = {
      data: {
        navId: 'nope',
      },
    } as unknown as ActivatedRouteSnapshot
    const routerEvent = new ActivationStart(routeSnapshot)

    it('should do nothing', () => {
      jest.spyOn(component, 'setHeader')
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.setHeader).not.toHaveBeenCalled()
    })
  })

  describe('On ActivationEnd to the same route', () => {
    const routeSnapshot = {
      data: {
        navId: 'sameRoute',
      },
    } as unknown as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should do nothing', () => {
      component.currentNavId = 'sameRoute'
      jest.spyOn(component, 'setHeader')
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.setHeader).not.toHaveBeenCalled()
    })
  })

  describe('Role restrictions for tabs', () => {
    let harnessLoader: HarnessLoader
    const routeSnapshot = {
      data: {
        navId: 'parent',
      },
    } as unknown as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    const mockManagerInfo: IAuthUserInfo = {
      sub: 'test-sub-1',
      groups: [AvailableRoles.Manager],
    }
    const mockResearcherInfo: IAuthUserInfo = {
      sub: 'test-sub-2',
      groups: [AvailableRoles.Researcher],
    }
    const mockFeature: AvailableFeatures[] = [AvailableFeatures.SearchByManager]
    beforeEach(() => {
      const featureService = TestBed.inject(FeatureService)
      spyOn(featureService, 'getFeature').mockReturnValue(of(mockFeature))
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()
      harnessLoader = TestbedHarnessEnvironment.loader(fixture)
    })
    it('should show all tabs to user with required roles', async () => {
      mockUserInfoSubject.next(mockManagerInfo)
      const tabLinks = await harnessLoader.getAllHarnesses(MatTabLinkHarness)
      expect(tabLinks.length).toBe(navItemsWithRestrictedTabs.tabNav.length)
    })
    it('should restrict tabs be only visible to allowed roles', async () => {
      mockUserInfoSubject.next(mockResearcherInfo)
      const tabLinks = await harnessLoader.getAllHarnesses(MatTabLinkHarness)
      expect(tabLinks.length).toBe(navItemsWithRestrictedTabs.tabNav.length - 1)
    })
  })
})
