import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { AdminService } from 'src/app/core/services/admin.service'
import { ApprovedUsersComponent } from './approved-users.component'
import { MaterialModule } from 'src/app/layout/material/material.module'
import { Component } from '@angular/core'
import { IUser } from 'src/app/shared/models/user/user.interface'
import { SearchComponent } from 'src/app/shared/components/search/search.component'
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { IUserFilter } from 'src/app/shared/models/user/user-filter.interface'

describe('ApprovedUsersComponent', () => {
  let component: ApprovedUsersComponent
  let fixture: ComponentFixture<ApprovedUsersComponent>

  const approvedUsersSubject$ = new Subject<IUser[]>()
  const filteredApprovedUsersSubject$ = new Subject<IUser[]>()
  const filterConfigSubject$ = new BehaviorSubject<IUserFilter>({
    searchText: '',
  })

  const adminService = {
    approvedUsersObservable$: approvedUsersSubject$.asObservable(),
    filteredApprovedUsersObservable$: filteredApprovedUsersSubject$.asObservable(),
    filterConfigObservable$: filterConfigSubject$.asObservable(),
    getApprovedUsers: () => of(),
    setFilter: (_: any) => {},
  } as AdminService

  @Component({ selector: 'num-approved-users-table', template: '' })
  class ApprovedUserTableStubComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovedUsersComponent, ApprovedUserTableStubComponent, SearchComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        FontAwesomeTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: AdminService,
          useValue: adminService,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedUsersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    jest.spyOn(adminService, 'setFilter')
    jest.spyOn(adminService, 'getApprovedUsers')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call getApprovedUsers', () => {
    expect(adminService.getApprovedUsers).toHaveBeenCalled()
  })

  it('should set the filter in the adminService on searchChange', () => {
    component.handleSearchChange()
    expect(adminService.setFilter).toHaveBeenCalledWith(component.filterConfig)
  })
})
