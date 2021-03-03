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
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'
import { AddUserOrganizationComponent } from '../add-user-organization/add-user-organization.component'
import { AddUserRolesComponent } from '../add-user-roles/add-user-roles.component'
import { APPROVE_USER_ERROR, APPROVE_USER_SUCCESS } from './constants'
import { DialogAddUserDetailsComponent } from './dialog-add-user-details.component'

describe('DialogAddUserDetailsComponent', () => {
  let component: DialogAddUserDetailsComponent
  let fixture: ComponentFixture<DialogAddUserDetailsComponent>

  const organizationsSubject$ = new Subject<IOrganization>()

  const adminService = ({
    approveUser: jest.fn().mockImplementation(() => of('Success')),
    addUserRoles: (userId: string, roles: string[]) => of(),
    addUserOrganization: (userId: string, organization: string) => of(),
    getUnapprovedUsers: () => of(),
  } as unknown) as AdminService

  const organizationService = ({
    organizationsObservable$: organizationsSubject$.asObservable(),
    getAll: () => of(mockOrganizations),
    setFilter: () => {},
  } as unknown) as OrganizationService

  const userProfileSubject$ = new Subject<IUserProfile>()
  const profileService = ({
    userProfileObservable$: userProfileSubject$.asObservable(),
  } as unknown) as ProfileService

  const userInfoSubject$ = new Subject<any>()
  const authService = {
    get isLoggedIn(): boolean {
      return true
    },
    userInfoObservable$: userInfoSubject$.asObservable(),
  } as AuthService

  const mockToastMessageService = ({
    openToast: jest.fn(),
  } as unknown) as ToastMessageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DialogAddUserDetailsComponent,
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
    fixture = TestBed.createComponent(DialogAddUserDetailsComponent)
    component = fixture.componentInstance
    component.dialogInput = mockUser
    userProfileSubject$.next(mockUserProfile1)
    fixture.detectChanges()
    jest.spyOn(component.closeDialog, 'emit')
    jest.spyOn(adminService, 'addUserRoles')
    jest.spyOn(adminService, 'addUserOrganization')
    jest.spyOn(adminService, 'approveUser')
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

  describe('When the dialog is confirmed', () => {
    beforeEach(() => {
      component.organization = mockOrganization1
      component.roles = ['some', 'assigned', 'role']
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call approveUser and getUnapprovedUsers methods', () => {
      expect(adminService.approveUser).toHaveBeenCalledWith(mockUser.id)
      expect(adminService.getUnapprovedUsers).toHaveBeenCalled()
    })

    it('should call addUserOrganization and addUserRoles after approveUser method completes', () => {
      jest.spyOn(adminService, 'approveUser')

      expect(adminService.addUserOrganization).toHaveBeenCalledWith(mockUser.id, mockOrganization1)
      expect(adminService.addUserRoles).toHaveBeenCalledWith(mockUser.id, [
        'some',
        'assigned',
        'role',
      ])
    })
  })
  describe('When the editing of the user was successful', () => {
    beforeEach(() => {
      jest.spyOn(adminService, 'addUserRoles').mockImplementation(() => of(mockUser.roles))
      jest.spyOn(adminService, 'addUserOrganization').mockImplementation(() => of('Success'))
      jest.spyOn(adminService, 'approveUser').mockImplementation(() => of('Success'))
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should display the success message', () => {
      const messageConfig: IToastMessageConfig = {
        ...APPROVE_USER_SUCCESS,
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
      jest.spyOn(adminService, 'approveUser').mockImplementation(() => of('Success'))
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should display the error message', () => {
      expect(mockToastMessageService.openToast).toHaveBeenCalledWith(APPROVE_USER_ERROR)
    })
  })
})
