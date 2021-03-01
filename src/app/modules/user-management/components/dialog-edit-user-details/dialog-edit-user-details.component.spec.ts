import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin/admin.service'
import { OrganizationService } from 'src/app/core/services/organization/organization.service'
import { ProfileService } from 'src/app/core/services/profile/profile.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IOrganization } from 'src/app/shared/models/organization/organization.interface'
import { IUserProfile } from 'src/app/shared/models/user/user-profile.interface'
import { mockRoles, mockUser } from 'src/mocks/data-mocks/admin.mock'
import { mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { mockUserProfile1 } from 'src/mocks/data-mocks/user-profile.mock'
import { AddUserOrganizationComponent } from '../add-user-organization/add-user-organization.component'
import { AddUserRolesComponent } from '../add-user-roles/add-user-roles.component'
import { DialogEditUserDetailsComponent } from './dialog-edit-user-details.component'

describe('DialogEditUserDetailsComponent', () => {
  let component: DialogEditUserDetailsComponent
  let fixture: ComponentFixture<DialogEditUserDetailsComponent>

  const organizationsSubject$ = new Subject<IOrganization>()

  const adminService = ({
    addUserRoles: (userId: string, roles: string[]) => of(),
    addUserOrganization: (userId: string, organization: string) => of(),
    getUserRoles: (userId: string) => of(mockRoles),
    refreshFilterResult: () => [],
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
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUserDetailsComponent)
    component = fixture.componentInstance
    component.dialogInput = mockUser
    userProfileSubject$.next(mockUserProfile1)
    fixture.detectChanges()
    jest.spyOn(component.closeDialog, 'emit')
    jest.spyOn(adminService, 'addUserRoles')
    jest.spyOn(adminService, 'addUserOrganization')
    jest.spyOn(adminService, 'refreshFilterResult')
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

  describe('When an organization is assigned and the dialog is confirmed', () => {
    beforeEach(() => {
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call addUserOrganization with userId', () => {
      expect(adminService.addUserOrganization).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.organization
      )
    })
    it('should call refreshFilterResult', () => {
      expect(adminService.refreshFilterResult).toHaveBeenCalled()
    })
  })
})
