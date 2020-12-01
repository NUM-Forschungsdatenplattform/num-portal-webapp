import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, ActivationEnd, ActivationStart, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { MaterialModule } from '../../material/material.module'
import INavItem from '../../models/nav-item.interface'
import { ButtonComponent } from '../../../shared/components/button/button.component'
import { LanguageComponent } from '../language/language.component'
import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let router: Router
  const routerEventsSubject = new Subject<ActivationEnd | ActivationStart>()

  @Component({ selector: 'num-stub', template: '' })
  class StubComponent {}

  const firstNavItem: INavItem = {
    routeTo: 'first',
    translationKey: 'first',
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

  const mainNavItems = [firstNavItem, secondNavItem, thirdNavItem]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, LanguageComponent, StubComponent, ButtonComponent],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
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
    }).compileComponents()
  })

  beforeEach(() => {
    router = TestBed.inject(Router)
    const routerAny = router as any
    routerAny.events = routerEventsSubject.asObservable()
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    component.mainNavItems = mainNavItems
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('On ActivationEnd to a route without tab navigation', () => {
    const routeSnapshot = ({
      data: {
        navId: 'second',
      },
    } as unknown) as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should set the mainNav header only', () => {
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.currentNavId).toEqual('second')
      expect(component.currentMainNavItem).toBe(secondNavItem)
      expect(component.currentTabNav).toBeFalsy()
    })
  })

  describe('On ActivationEnd to a route with tab navigation', () => {
    const routeSnapshot = ({
      data: {
        navId: 'third',
      },
    } as unknown) as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should set the mainNav header only', () => {
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.currentNavId).toEqual('third')
      expect(component.currentMainNavItem).toBe(thirdNavItem)
      expect(component.currentTabNav).toBe(thirdNavItem.tabNav)
    })
  })

  describe('On ActivationEnd to a route without navId', () => {
    const routeSnapshot = ({
      data: {
        navId: 'nope',
      },
    } as unknown) as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should set the mainNav to be undefined', () => {
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.currentNavId).toEqual('nope')
      expect(component.currentMainNavItem).toBeFalsy()
      expect(component.currentTabNav).toBeFalsy()
    })
  })

  describe('On ActivationStart to a route', () => {
    const routeSnapshot = ({
      data: {
        navId: 'nope',
      },
    } as unknown) as ActivatedRouteSnapshot
    const routerEvent = new ActivationStart(routeSnapshot)

    it('should do nothing', () => {
      jest.spyOn(component, 'setHeader')
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.setHeader).not.toHaveBeenCalled()
    })
  })

  describe('On ActivationEnd to the same route', () => {
    const routeSnapshot = ({
      data: {
        navId: 'sameRoute',
      },
    } as unknown) as ActivatedRouteSnapshot
    const routerEvent = new ActivationEnd(routeSnapshot)

    it('should do nothing', () => {
      component.currentNavId = 'sameRoute'
      jest.spyOn(component, 'setHeader')
      routerEventsSubject.next(routerEvent)
      fixture.detectChanges()

      expect(component.setHeader).not.toHaveBeenCalled()
    })
  })
})
