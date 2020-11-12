import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TestUserHasRoleComponent } from 'src/mocks/component-mocks/test-user-has-role.component'
import { UserHasRoleDirective } from './user-has-role.directive'
import { KeycloakService } from 'keycloak-angular'

describe('Directive: MyCustomIfDirective', () => {
  let component: TestUserHasRoleComponent
  let fixture: ComponentFixture<TestUserHasRoleComponent>

  const keycloak = {
    getUserRoles: () => [],
  } as KeycloakService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestUserHasRoleComponent, UserHasRoleDirective],
      providers: [
        {
          provide: KeycloakService,
          useValue: keycloak,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUserHasRoleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
