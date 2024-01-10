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

import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { of, Subject } from 'rxjs'

import { OrganizationManagementComponent } from './organization-management.component'
import { AuthService } from '../../../../core/auth/auth.service'
import { OrganizationService } from '../../../../core/services/organization/organization.service'
import { MaterialModule } from 'projects/num-lib/src/lib/layout/material/material.module'
import { ButtonComponent } from '../../../../shared/components/button/button.component'
import { DirectivesModule } from '../../../../shared/directives/directives.module'

describe('OrganizationManagementComponent', () => {
  let fixture: ComponentFixture<OrganizationManagementComponent>

  const organizationService = {
    getAllPag: jest.fn().mockImplementation(() => of()),
  } as unknown as OrganizationService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  @Component({ selector: 'num-organizations-table', template: '' })
  class StubOrganizationsTable {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationManagementComponent, StubOrganizationsTable, ButtonComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        DirectivesModule,
        FontAwesomeTestingModule,
      ],
      providers: [
        {
          provide: OrganizationService,
          useValue: organizationService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    TestBed.inject(Router)
    jest.restoreAllMocks()
    jest.clearAllMocks()
    jest.spyOn(organizationService, 'getAllPag')
  })

  describe('When the components gets initialized', () => {
    it('should call the getAllPag method', () => {
      fixture = TestBed.createComponent(OrganizationManagementComponent)

      fixture.detectChanges()
      expect(organizationService.getAllPag).toHaveBeenCalled()
    })
  })
})
