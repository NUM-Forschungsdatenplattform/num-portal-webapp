import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from '../../material/material.module'
import { AppLayoutComponent } from './app-layout.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout'
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

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent
  let fixture: ComponentFixture<AppLayoutComponent>
  let breakpointObserver: BreakpointObserver

  const authService = {
    logOut: () => {},
    loadUserProfile: () => Promise.resolve({}),
  } as OAuthService

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
      ],
    }).compileComponents()
  })

  describe('On handset devices', () => {
    beforeEach(() => {
      const breakPointState = {
        matches: true,
        breakpoints: {
          [Breakpoints.Handset]: true,
          [Breakpoints.Large]: false,
        },
      } as BreakpointState

      breakpointObserver = TestBed.inject(BreakpointObserver)
      jest.spyOn(breakpointObserver, 'observe').mockImplementation(() => of(breakPointState))

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
  })

  describe('On non-handset devices', () => {
    beforeEach(() => {
      const breakPointState = {
        matches: false,
        breakpoints: {
          [Breakpoints.Handset]: false,
          [Breakpoints.Large]: true,
        },
      } as BreakpointState

      breakpointObserver = TestBed.inject(BreakpointObserver)
      jest.spyOn(breakpointObserver, 'observe').mockImplementation(() => of(breakPointState))

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
