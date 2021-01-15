import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { OrganizationService } from 'src/app/core/services/organization.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { mockUser } from 'src/mocks/data-mocks/admin.mock'
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { AddUserOrganizationComponent } from '../add-user-organization/add-user-organization.component'
import { AddUserRolesComponent } from '../add-user-roles/add-user-roles.component'
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
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserDetailsComponent)
    component = fixture.componentInstance
    component.dialogInput = mockUser
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
})
