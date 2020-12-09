import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { OrganizationService } from 'src/app/core/services/organization.service'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { IOrganizationFilter } from 'src/app/shared/models/user/organization-filter.interface'
import { IOrganization } from 'src/app/shared/models/user/organization.interface'
import { mockUser } from 'src/mocks/data-mocks/admin.mock'
import { mockOrganization1, mockOrganizations } from 'src/mocks/data-mocks/organizations.mock'
import { AddUserOrganizationComponent } from '../add-user-organization/add-user-organization.component'
import { AddUserRolesComponent } from '../add-user-roles/add-user-roles.component'
import { DialogAddUserDetailsComponent } from './dialog-add-user-details.component'

describe('DialogAddUserDetailsComponent', () => {
  let component: DialogAddUserDetailsComponent
  let fixture: ComponentFixture<DialogAddUserDetailsComponent>

  const filteredOrganizationsSubject$ = new Subject<IOrganization>()
  const filterConfigSubject$ = new BehaviorSubject<IOrganizationFilter>({ searchText: '' })

  const adminService = ({
    addUserRoles: (userId: string, role: string) => of(),
    addUserOrganization: (userId: string, organization: string) => of(),
  } as unknown) as AdminService

  const organizationService = ({
    filteredOrganizationsObservable$: filteredOrganizationsSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
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
    jest.spyOn(organizationService, 'setFilter')
  })

  it('should create and call getAll() Organizations', () => {
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
      component.roles = ['some', 'assigned', 'role']
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call addUserRoles with userId for each role', () => {
      expect(adminService.addUserRoles).toHaveBeenCalledTimes(3)
    })
  })

  describe('When an organization is assigned and the dialog is confirmed', () => {
    beforeEach(() => {
      component.organization = mockOrganization1
      component.handleDialogConfirm()
      fixture.detectChanges()
    })

    it('should call addUserOrganization with userId', () => {
      expect(adminService.addUserOrganization).toHaveBeenCalledWith(mockUser.id, mockOrganization1)
    })
  })

  describe('When an organization is searched', () => {
    beforeEach(() => {
      component.handleSearchChange()
    })

    it('should set the filter in the aqlService on searchChange', () => {
      expect(organizationService.setFilter).toHaveBeenCalledWith(component.filterConfig)
    })
  })
})
