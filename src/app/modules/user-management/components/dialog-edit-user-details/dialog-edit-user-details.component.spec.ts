import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonHarness } from '@angular/material/button/testing'
import { MatInputHarness } from '@angular/material/input/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
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
import { mockUserProfile1, mockUserProfile2 } from 'src/mocks/data-mocks/user-profile.mock'
import { AddUserOrganizationComponent } from '../add-user-organization/add-user-organization.component'
import { AddUserRolesComponent } from '../add-user-roles/add-user-roles.component'
import { EDIT_USER_ERROR, EDIT_USER_SUCCESS, INVALID_USER_NAME_ERROR } from './constants'
import { DialogEditUserDetailsComponent } from './dialog-edit-user-details.component'

describe('DialogEditUserDetailsComponent', () => {
  let component: DialogEditUserDetailsComponent
  let fixture: ComponentFixture<DialogEditUserDetailsComponent>
  let loader: HarnessLoader

  const organizationsSubject$ = new Subject<IOrganization>()

  const adminService = {
    approveUser: jest.fn().mockReturnValue(of('Success')),
    addUserRoles: jest.fn().mockReturnValue(of(mockUser.roles)),
    addUserOrganization: jest.fn().mockReturnValue(of('Success')),
    changeUserName: jest.fn().mockReturnValue(of('Test Changed User Changed')),
    changeUserEnabledStatus: jest.fn().mockReturnValue(of('')),
    refreshFilterResult: jest.fn().mockReturnValue(of()),
    getUnapprovedUsers: jest.fn().mockReturnValue(of([])),
  } as unknown as AdminService

  const organizationService = {
    organizationsObservable$: organizationsSubject$.asObservable(),
    getAll: () => of(mockOrganizations),
    setFilter: () => {},
  } as unknown as OrganizationService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = {
    get: jest.fn().mockReturnValue(of(mockUserProfile2)),
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown as ProfileService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as unknown as AuthService

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
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeTestingModule,
        TranslateModule.forRoot(),
        DirectivesModule,
      ],
      providers: [
        { provide: AdminService, useValue: adminService },
        { provide: OrganizationService, useValue: organizationService },
        { provide: ProfileService, useValue: profileService },
        { provide: AuthService, useValue: authService },
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
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit the close event on confirmation', async () => {
    await component.handleDialogConfirm()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  it('should emit the close event on dialog cancel', () => {
    component.handleDialogCancel()
    expect(component.closeDialog.emit).toHaveBeenCalledTimes(1)
  })

  describe('When roles are assigned and the dialog is confirmed', () => {
    beforeEach(async () => {
      await component.handleDialogConfirm()
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
    beforeEach(async () => {
      component.organization = mockOrganization2
      await component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call addUserOrganization with userId', () => {
      expect(adminService.addUserOrganization).toHaveBeenCalledWith(mockUser.id, mockOrganization2)
    })

    it('should call refreshFilterResult', () => {
      expect(adminService.refreshFilterResult).toHaveBeenCalled()
    })
  })

  describe('When editing the user was successful', () => {
    beforeEach(async () => {
      jest.spyOn(adminService, 'addUserRoles').mockReturnValue(of(mockUser.roles))
      jest.spyOn(adminService, 'addUserOrganization').mockReturnValue(of('Success'))
      await component.handleDialogConfirm()
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

  describe('When editing the user has failed', () => {
    beforeEach(async () => {
      jest.spyOn(adminService, 'addUserRoles').mockReturnValue(throwError(() => new Error('error')))
      await component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should display the error message', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(EDIT_USER_ERROR)
    })
  })

  describe('When editing the user name with valid data', () => {
    beforeEach(async () => {
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
      component.userNameForm.patchValue({ firstName: '' })
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

    it('should not call changeUserName method of admin service on uncached data', async () => {
      const changeUserNameSpy = jest.spyOn(adminService, 'changeUserName')

      await component.handleDialogConfirm()
      fixture.detectChanges()
      expect(changeUserNameSpy).not.toHaveBeenCalled()
    })
  })
})
