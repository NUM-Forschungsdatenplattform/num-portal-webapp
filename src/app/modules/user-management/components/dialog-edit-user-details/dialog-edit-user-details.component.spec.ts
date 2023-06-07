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

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonHarness } from '@angular/material/button/testing'
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
import { EDIT_USER_ERROR, EDIT_USER_SUCCESS, INVALID_USER_NAME_ERROR } from './constants'
import { DialogEditUserDetailsComponent } from './dialog-edit-user-details.component'
import { MatInputHarness } from '@angular/material/input/testing'

describe('DialogEditUserDetailsComponent', () => {
  let component: DialogEditUserDetailsComponent
  let fixture: ComponentFixture<DialogEditUserDetailsComponent>
  let loader: HarnessLoader

  const organizationsSubject$ = new Subject<IOrganization>()

  const adminService = {
    approveUser: jest.fn().mockImplementation(() => of('Success')),
    addUserRoles: jest.fn(),
    addUserOrganization: jest.fn(),
    changeUserName: jest.fn(),
    refreshFilterResult: jest.fn(),
    getUnapprovedUsers: jest.fn(),
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
    jest.spyOn(adminService, 'addUserRoles').mockImplementation(() => of())
    jest.spyOn(adminService, 'addUserOrganization').mockImplementation(() => of())
    jest.spyOn(adminService, 'approveUser').mockImplementation((userId: string) => of(userId))
    jest.spyOn(adminService, 'refreshFilterResult').mockImplementation(() => of())
    jest.spyOn(adminService, 'getUnapprovedUsers').mockImplementation(() => of([]))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the close event on confirmation', (done) => {
    jest.spyOn(adminService, 'addUserRoles').mockImplementation((id, roles) => of(roles))
    component.handleDialogConfirm().then(() => {
      expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
      done()
    })
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

  describe('When editing the user name with valid data', () => {
    beforeEach(async () => {
      jest
        .spyOn(adminService, 'changeUserName')
        .mockImplementation((userId: string, firstName: string, lastName: string) =>
          of(`${firstName} ${lastName}`)
        )

      jest
        .spyOn(adminService, 'addUserRoles')
        .mockImplementation((userId: string, roles: string[]) => of(roles))

      jest.spyOn(mockToastMessageService, 'openToast')

      component.isApproval = false
      component.isUserNameEditMode = true
      component.userNameForm.patchValue({ firstName: 'Test Changed', lastName: 'User Changed' })

      await component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call the changeUserName method of admin service with expected parameters', () => {
      expect(adminService.changeUserName).toHaveBeenCalledWith(
        '123-456',
        'Test Changed',
        'User Changed'
      )
    })

    it('should call the addUserRole method of admin service with expected parameters', () => {
      expect(adminService.addUserRoles).toHaveBeenCalledWith('123-456', ['some', 'role'])
    })

    it('should show a toast notification', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith({
        ...EDIT_USER_SUCCESS,
        messageParameters: { firstName: 'Max', lastName: 'Mustermann' },
      })
    })
  })

  describe('When editing the user name with invalid data', () => {
    beforeEach(async () => {
      jest.spyOn(mockToastMessageService, 'openToast')

      component.userNameForm.patchValue({
        firstName: '',
      })
      component.isUserNameEditMode = true
      await component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should show a message if form data is invalid', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(INVALID_USER_NAME_ERROR)
    })

    it('should not call the updateUserName method of admin service', () => {
      expect(adminService.changeUserName).not.toHaveBeenCalled()
    })
  })

  describe('When clicking on edit name buttons', () => {
    let editButton: MatButtonHarness
    beforeEach(async () => {
      loader = TestbedHarnessEnvironment.loader(fixture)
      editButton = await loader.getHarness(
        MatButtonHarness.with({ selector: `[data-test="user-management__button__edit_user_name"]` })
      )
      await editButton.click()
    })

    it('should set the component into edit name mode', () => {
      expect(component.isUserNameEditMode).toBe(true)
    })

    it('should reset the name to default on click discard button', async () => {
      const firstNameInput = await loader.getHarness(
        MatInputHarness.with({ selector: `[data-test="user-management__input__first_name"]` })
      )
      const lastNameInput = await loader.getHarness(
        MatInputHarness.with({ selector: `[data-test="user-management__input__last_name"]` })
      )

      await firstNameInput.setValue('Changed first name')
      await lastNameInput.setValue('Changed last name')

      const discardButton = await loader.getHarness(
        MatButtonHarness.with({
          selector: `[data-test="user-management__button__discard_user_name_changes"]`,
        })
      )
      await discardButton.click()

      expect(component.isUserNameEditMode).toBe(false)
      expect(component.userNameForm.get('firstName').value).toEqual(mockUser.firstName)
      expect(component.userNameForm.get('lastName').value).toEqual(mockUser.lastName)
    })

    it('should not call changeUnserName method of admin service on uncahched data', async () => {
      jest.spyOn(adminService, 'changeUserName')
      await component.handleDialogConfirm()
      expect(adminService.changeUserName).not.toHaveBeenCalled()
    })
  })
})
