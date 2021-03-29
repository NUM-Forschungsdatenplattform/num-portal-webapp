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
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { SideMenuComponent } from './side-menu.component'
import { MaterialModule } from '../../material/material.module'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { AuthService } from 'src/app/core/auth/auth.service'
import { OAuthService } from 'angular-oauth2-oidc'
import { of, Subject } from 'rxjs'
import { ContentService } from '../../../core/services/content/content.service'
import { mockNavigationLinks } from '../../../../mocks/data-mocks/navigation-links.mock'

describe('SideMenuComponent', () => {
  let component: SideMenuComponent
  let fixture: ComponentFixture<SideMenuComponent>

  const userInfo = {
    sub: 'sub123-456',
    groups: ['user', 'has', 'required', 'role'],
  }

  const oauthService = {
    logOut: () => {},
    initCodeFlow: () => {},
  } as OAuthService

  const mockContentService = ({
    getNavigationLinks: jest.fn(),
  } as unknown) as ContentService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    logout: () => {},
    login: () => {},
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

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
          useValue: oauthService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: ContentService,
          useValue: mockContentService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent)
    jest
      .spyOn(mockContentService, 'getNavigationLinks')
      .mockImplementation(() => of(mockNavigationLinks))
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(component.toggleSideMenu, 'emit')
    jest.spyOn(authService, 'logout')
    jest.spyOn(authService, 'login')
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
    userInfoSubject$.next(userInfo)
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
    expect(authService.logout).toHaveBeenCalled()
  })

  it('Calls login function when login button is clicked', () => {
    component.mainNavItems = null
    component.secondaryNavItems = [
      {
        icon: 'test',
        routeTo: '#login',
        translationKey: 'test',
      },
    ]
    fixture.detectChanges()
    const nativeElement = fixture.debugElement.nativeElement
    const button = nativeElement.querySelector('.mat-list-item')
    button.click()
    fixture.detectChanges()
    expect(authService.login).toHaveBeenCalled()
  })
})
