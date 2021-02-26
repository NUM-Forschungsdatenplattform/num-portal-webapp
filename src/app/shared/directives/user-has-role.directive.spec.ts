import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UserHasRoleDirective } from './user-has-role.directive'
import { Component } from '@angular/core'
import { AuthService } from 'src/app/core/auth/auth.service'
import { Subject } from 'rxjs'
import { IAuthUserInfo } from '../models/user/auth-user-info.interface'

describe('Directive: UserHasRoleDirective', () => {
  let component: TestUserHasRoleComponent
  let fixture: ComponentFixture<TestUserHasRoleComponent>

  const testContent = 'TestContent'
  @Component({
    template: `<div>
      <span *numUserHasRole="allowedRoles">${testContent}</span>
    </div>`,
  })
  class TestUserHasRoleComponent {
    allowedRoles: string[] = []
  }

  const userInfo = {
    sub: 'sub123-456',
    groups: ['user', 'has', 'some', 'role'],
  }

  const userInfoUndefined = {
    sub: undefined,
  }

  const userInfoNoGroups = {
    sub: 'sub123-456',
    groups: undefined,
  }

  const mockUserInfoSubject = new Subject<IAuthUserInfo>()
  const authService = ({
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: mockUserInfoSubject.asObservable(),
  } as unknown) as AuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestUserHasRoleComponent, UserHasRoleDirective],
      providers: [
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
    fixture.detectChanges()
  })

  describe('When the user is logged in and the userinfo is defined', () => {
    describe('When the user has the required roles', () => {
      it('shows the element', () => {
        component.allowedRoles = ['some', 'allowed', 'roles']
        fixture.detectChanges()
        mockUserInfoSubject.next(userInfo)
        fixture.detectChanges()
        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')

        expect(htmlElement.textContent).toEqual(testContent)
      })
    })

    describe('When the user does not have the required roles', () => {
      test.each([userInfo, userInfoNoGroups])('does not show the element', (userInfoCase) => {
        component.allowedRoles = ['no', 'allowed', 'roles']
        fixture.detectChanges()

        mockUserInfoSubject.next(userInfoCase)
        mockUserInfoSubject.next(userInfoCase)
        fixture.detectChanges()

        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')

        expect(htmlElement).toBeFalsy()
      })
    })

    describe('When the allowed roles are undefined', () => {
      beforeEach(() => {
        component.allowedRoles = undefined
        fixture.detectChanges()
      })
      it('shows the element', () => {
        mockUserInfoSubject.next(userInfo)
        fixture.detectChanges()
        const debugElement = fixture.debugElement.nativeElement
        const htmlElement = debugElement.querySelector('span')
        expect(htmlElement.textContent).toEqual(testContent)
      })
    })
  })
})
