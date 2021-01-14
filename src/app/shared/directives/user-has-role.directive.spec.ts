import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UserHasRoleDirective } from './user-has-role.directive'
import { OAuthService } from 'angular-oauth2-oidc'
import { Component } from '@angular/core'
import { AuthService } from 'src/app/core/auth/auth.service'

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

  describe('When the user is logged in and the userinfo is defined', () => {
    const oauthService = ({
      loadUserProfile: () => Promise.resolve(userInfo),
    } as unknown) as OAuthService

    const authService = ({
      get isLoggedIn() {
        return true
      },
    } as unknown) as AuthService

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestUserHasRoleComponent, UserHasRoleDirective],
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
      jest.restoreAllMocks()
      fixture = TestBed.createComponent(TestUserHasRoleComponent)
      component = fixture.componentInstance
    })

    describe('When the user has the required roles', () => {
      beforeEach(() => {
        jest.spyOn(oauthService, 'loadUserProfile').mockResolvedValue(userInfo)
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
        jest.spyOn(oauthService, 'loadUserProfile').mockResolvedValue(userInfo)
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
        jest.spyOn(oauthService, 'loadUserProfile').mockResolvedValue(userInfo)
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

  describe('When the user is logged in and the userInfo is not defined', () => {
    const oauthService = ({
      loadUserProfile: () => Promise.resolve(undefinedUserInfo),
    } as unknown) as OAuthService

    const authService = ({
      get isLoggedIn() {
        return true
      },
    } as unknown) as AuthService

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestUserHasRoleComponent, UserHasRoleDirective],
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
      jest.restoreAllMocks()
      fixture = TestBed.createComponent(TestUserHasRoleComponent)
      component = fixture.componentInstance
    })
    describe('When the userRoles are undefined', () => {
      beforeEach(() => {
        jest.spyOn(oauthService, 'loadUserProfile').mockResolvedValue(undefinedUserInfo)
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

  describe('When the user is not logged in', () => {
    const oauthService = ({
      loadUserProfile: () => Promise.resolve(undefinedUserInfo),
    } as unknown) as OAuthService

    const authService = ({
      isLoggedIn: false,
    } as unknown) as AuthService

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestUserHasRoleComponent, UserHasRoleDirective],
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
      jest.restoreAllMocks()
      fixture = TestBed.createComponent(TestUserHasRoleComponent)
      component = fixture.componentInstance
    })
    describe('When the allowedRoles are undefined', () => {
      beforeEach(() => {
        jest.spyOn(oauthService, 'loadUserProfile').mockResolvedValue(userInfo)
        component.allowedRoles = undefined
        fixture.detectChanges()
      })
      it('does show the element', () => {
        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')
        expect(htmlElement.textContent).toEqual(testContent)
      })
    })
  })
})
