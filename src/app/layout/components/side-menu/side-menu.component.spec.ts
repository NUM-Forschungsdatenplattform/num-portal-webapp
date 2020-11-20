import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'

import { SideMenuComponent } from './side-menu.component'
import { MaterialModule } from '../../material/material.module'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'

describe('SideMenuComponent', () => {
  let component: SideMenuComponent
  let fixture: ComponentFixture<SideMenuComponent>

  const authService = {
    logOut: () => {},
    loadUserProfile: () => Promise.resolve({}),
  } as OAuthService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
      imports: [
        FontAwesomeTestingModule,
        MaterialModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        DirectivesModule,
      ],
      providers: [
        {
          provide: OAuthService,
          useValue: authService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(component.toggleSideMenu, 'emit')
    jest.spyOn(authService, 'logOut').mockImplementation(() => Promise.resolve())
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Calls emit on toggleSideMenu when menu item is clicked', () => {
    component.mainNavItems = [
      {
        icon: 'test',
        routeTo: '/test',
        translationKey: 'test',
      },
    ]
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('.mat-list-item')
    button.click()
    expect(component.toggleSideMenu.emit).toHaveBeenCalled()
  })

  it('Calls logout function when logout button is clicked', () => {
    component.mainNavItems = null
    component.secondaryNavItems = [
      {
        icon: 'test',
        routeTo: '#logout',
        translationKey: 'test',
      },
    ]
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('.mat-list-item')
    button.click()
    fixture.detectChanges()
    expect(authService.logOut).toHaveBeenCalled()
  })
})
