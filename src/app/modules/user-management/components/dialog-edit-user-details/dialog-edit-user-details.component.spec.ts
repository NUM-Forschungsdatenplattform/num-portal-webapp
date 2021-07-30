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
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject, throwError } from 'rxjs'
import { AuthService } from 'src/app/core/auth/auth.service'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { ToastMessageService } from 'src/app/core/services/toast-message/toast-message.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { DirectivesModule } from 'src/app/shared/directives/directives.module'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { IToastMessageConfig } from 'src/app/shared/models/toast-message-config.interface'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { mockUser } from 'src/mocks/data-mocks/admin.mock'
import { mockOrganization2, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'
import { AddUserOrganizationComponent } from '../add-user-organization/add-user-organization.component'
import { AddUserRolesComponent } from '../add-user-roles/add-user-roles.component'
import { EDIT_USER_ERROR, EDIT_USER_SUCCESS } from './constants'
import { DialogEditUserDetailsComponent } from './dialog-edit-user-details.component'

describe('DialogEditUserDetailsComponent', () => {
  let component: DialogEditUserDetailsComponent
  let fixture: ComponentFixture<DialogEditUserDetailsComponent>

  const organizationsSubject$ = new Subject<IOrganization>()

  const adminService = {
    approveUser: jest.fn().mockImplementation(() => of('Success')),
    addUserRoles: (userId: string, roles: string[]) => of(),
    addUserOrganization: (userId: string, organization: string) => of(),
    refreshFilterResult: () => [],
    getUnapprovedUsers: () => of(),
  } as unknown as AdminService

  const organizationService = {
    organizationsObservable$: organizationsSubject$.asObservable(),
    getAll: () => of(mockOrganizations),
    setFilter: () => {},
  } as unknown as OrganizationService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown as ProfileService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const mockToastMessageService = {
    openToast: jest.fn(),
  } as unknown as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogEditUserDetailsComponent,
        AddUserRolesComponent,
        AddUserOrganizationComponent,
        SearchComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        DirectivesModule,
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
        {
          provide: OrganizationService,
          useValue: organizationService,
        },
        {
          provide: ProfileService,
          useValue: profileService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        { provide: ToastMessageService, useValue: mockToastMessageService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUserDetailsComponent)
    component = fixture.componentInstance
    component.dialogInput = { user: mockUser, isApproval: false }
    userProfileSubject$.next(mockUserProfile1)
    fixture.detectChanges()
    jest.spyOn(component.closeDialog, 'emit')
    jest.spyOn(adminService, 'addUserRoles')
    jest.spyOn(adminService, 'addUserOrganization')
    jest.spyOn(adminService, 'approveUser')
    jest.spyOn(adminService, 'refreshFilterResult')
    jest.spyOn(adminService, 'getUnapprovedUsers')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the close event on confirmation', () => {
    component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  describe('When roles are assigned and the dialog is confirmed', () => {
    beforeEach(() => {
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call addUserRoles with userId', () => {
      expect(adminService.addUserRoles).toHaveBeenCalledWith(mockUser.id, mockUser.roles)
    })
    it('should call refreshFilterResult', () => {
      expect(adminService.refreshFilterResult).toHaveBeenCalled()
    })
  })

  describe('When the organization was changed and the dialog is confirmed', () => {
    beforeEach(() => {
      component.organization = mockOrganization2
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call addUserOrganization with userId', () => {
      expect(adminService.addUserOrganization).toHaveBeenCalledWith(mockUser.id, mockOrganization2)
    })
    it('should call refreshFilterResult', () => {
      expect(adminService.refreshFilterResult).toHaveBeenCalled()
    })
  })

  describe('When the user is approved and the dialog is confirmed', () => {
    beforeEach(() => {
      component.isApproval = true
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call approveUser methods', () => {
      expect(adminService.approveUser).toHaveBeenCalledWith(mockUser.id)
    })
    it('should call getUnapprovedUsers method', () => {
      expect(adminService.getUnapprovedUsers).toHaveBeenCalled()
    })
  })

  describe('When the editing of the user was successful', () => {
    beforeEach(() => {
      jest.spyOn(adminService, 'addUserRoles').mockImplementation(() => of(mockUser.roles))
      jest.spyOn(adminService, 'addUserOrganization').mockImplementation(() => of('Success'))
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should display the success message', () => {
      const messageConfig: IToastMessageConfig = {
        ...EDIT_USER_SUCCESS,
        messageParameters: {
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
        },
      }
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(messageConfig)
    })
  })

  describe('When the editing of the user has failed', () => {
    beforeEach(() => {
      jest.spyOn(adminService, 'addUserRoles').mockImplementation(() => throwError('error'))
      jest.spyOn(adminService, 'addUserOrganization').mockImplementation(() => of('Success'))
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should display the error message', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(EDIT_USER_ERROR)
    })
  })
})
