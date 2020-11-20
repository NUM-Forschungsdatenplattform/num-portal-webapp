import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestUserHasRoleComponent } from 'src/mocks/component-mocks/test-user-has-role.component'
import { UserHasRoleDirective } from './user-has-role.directive'
import { OAuthService } from 'angular-oauth2-oidc'
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

describe('Directive: UserHasRoleDirective', () => {
  let component: TestUserHasRoleComponent
  let fixture: ComponentFixture<TestUserHasRoleComponent>
  let divEl: DebugElement

  const userInfo = {
    sub: 'sub123-456',
    groups: ['user', 'has', 'some', 'role'],
  }

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
    fixture = TestBed.createComponent(TestUserHasRoleComponent)
    component = fixture.componentInstance
    // divEl = fixture.debugElement.query(By.css('div'))
    // fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('When the user has the required roles', () => {
    it('shows the element', () => {
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      component.allowedRoles = ['some', 'allowed', 'roles']

      fixture.detectChanges()
      const divEl = fixture.debugElement.query(By.css('div'))
      expect(divEl.nativeElement.textContent.trim()).toBe('Test Content')
    })
  })

  describe('When the user does not have the required roles', () => {
    it('does not show the element', () => {
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      component.allowedRoles = ['no', 'allowed', 'roles']

      fixture.detectChanges()
      divEl = fixture.debugElement.query(By.css('div'))
      expect(divEl.nativeElement.textContent.trim()).toBe('')
    })
  })

  describe('When the allowed roles are undefined', () => {
    it('shows the element', () => {
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(userInfo)
      component.allowedRoles = undefined

      fixture.detectChanges()
      divEl = fixture.debugElement.query(By.css('div'))
      expect(divEl.nativeElement.textContent.trim()).toBe('Test Content')
    })
  })

  describe('When the userRoles are undefined', () => {
    const undefinedUser = {
      sub: 'sub123-456',
      groups: undefined,
    }

    it('does not show the element', () => {
      jest.spyOn(authService, 'loadUserProfile').mockResolvedValue(undefinedUser)
      component.allowedRoles = ['some', 'allowed', 'roles']

      fixture.detectChanges()
      divEl = fixture.debugElement.query(By.css('div'))
      expect(divEl.nativeElement.textContent.trim()).toBe('')
    })
  })
})
