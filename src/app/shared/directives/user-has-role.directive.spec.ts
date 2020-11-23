import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UserHasRoleDirective } from './user-has-role.directive'
import { OAuthService } from 'angular-oauth2-oidc'
import { Component } from '@angular/core'

describe('Directive: UserHasRoleDirective', () => {
  const testContent = 'TestContent'
  @Component({
    template: ` <div>
      <span *numUserHasRole="allowedRoles">${testContent}</span>
    </div>`,
  })
  class TestUserHasRoleComponent {
    allowedRoles: string[] = []
  }

  let component: TestUserHasRoleComponent
  let fixture: ComponentFixture<TestUserHasRoleComponent>
  const userInfo = {
    sub: 'sub123-456',
    groups: ['user', 'has', 'some', 'role'],
  }
  const undefinedUserInfo = {
    sub: 'sub123-456',
    groups: undefined,
  }
  describe('When the userinfo is defined', () => {
    const authService = ({
      loadUserProfile: () => Promise.resolve(userInfo),
    } as unknown) as OAuthService
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestUserHasRoleComponent, UserHasRoleDirective],
        providers: [
          {
            provide: OAuthService,
            useValue: authService,
          },
        ],
      }).compileComponents()
    })
    beforeEach(() => {
      jest.restoreAllMocks()
      fixture = TestBed.createComponent(TestUserHasRoleComponent)
      component = fixture.componentInstance
    })
    describe('When the user has the required roles', () => {
      beforeEach(() => {
        jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
        component.allowedRoles = ['some', 'allowed', 'roles']
        fixture.detectChanges()
      })
      it('shows the element', () => {
        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')
        expect(htmlElement.textContent).toEqual(testContent)
      })
    })
    describe('When the user does not have the required roles', () => {
      beforeEach(() => {
        jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
        component.allowedRoles = ['no', 'allowed', 'roles']
        fixture.detectChanges()
      })
      it('does not show the element', () => {
        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')
        expect(htmlElement).toBeFalsy()
      })
    })
    describe('When the allowed roles are undefined', () => {
      beforeEach(() => {
        jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
        component.allowedRoles = undefined
        fixture.detectChanges()
      })
      it('shows the element', () => {
        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')
        expect(htmlElement.textContent).toEqual(testContent)
      })
    })
  })
  describe('When the userInfo is not defined', () => {
    const authService = ({
      loadUserProfile: () => Promise.resolve(undefinedUserInfo),
    } as unknown) as OAuthService
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestUserHasRoleComponent, UserHasRoleDirective],
        providers: [
          {
            provide: OAuthService,
            useValue: authService,
          },
        ],
      }).compileComponents()
    })
    beforeEach(() => {
      jest.restoreAllMocks()
      fixture = TestBed.createComponent(TestUserHasRoleComponent)
      component = fixture.componentInstance
    })
    describe('When the userRoles are undefined', () => {
      beforeEach(() => {
        jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(undefinedUserInfo)
        component.allowedRoles = ['some', 'allowed', 'roles']
        fixture.detectChanges()
      })
      it('does not show the element', () => {
        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')
        expect(htmlElement).toBeFalsy()
      })
    })
  })
})
